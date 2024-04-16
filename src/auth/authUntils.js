const Jwt = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/asyncHandler');
const { AuthRequestError, NotFoundRequestError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
    API_KEY : 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION :'authorization',
    REFRESHTOKEN :'x-rtoken-id'

}
const createTokenPair = async ( payload,publickey,privateKey) =>{
    try {
        //access token
        const accessToken = await Jwt.sign(payload,publickey,{
            // algorithm:'RS256',
            expiresIn:'2 days'
        });
        //refreshToken
        const refreshToken = await Jwt.sign(payload,privateKey,{
            // algorithm:'RS256',
            expiresIn:'7 days'
        })
        Jwt.verify(accessToken,publickey,(err,decode)=>{
            if(err){
                console.error('error.verify',err)
            }else{
                console.log('decode verify',decode)
            }
        })
        return {accessToken,refreshToken}
    }catch(error){

    }
}

//version 1
const authentication = asyncHandler(async (req,res,next)=>{
    /**
     * 1. check user_id missing??
     * 2. get accessToken
     * 3. verifyToken
     * 4. check user in dbs?
     * 5. check keyStore with this userId?
     * 6. ok all => next()
     */
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new AuthRequestError('Invalid Request')
    //2
    const keyStore = await findByUserId(userId)
    
    if (!keyStore) throw new  NotFoundRequestError('not found keyStore')
    //3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
 
    if(!accessToken) throw new AuthRequestError('Invalid Request') 
    
    try {
        const deCodeUser = Jwt.verify(accessToken,keyStore.publicKey)
      
        if(userId !== deCodeUser.userId) throw new AuthRequestError ('Invalid Userid')

        req.keyStore = keyStore;
        return next()
    } catch (error) {
        throw error
    }
})

// version 2
const authenticationV2 = asyncHandler(async (req,res,next)=>{
    /**
     * 1. check user_id missing??
     * 2. get accessToken
     * 3. verifyToken
     * 4. check user in dbs?
     * 5. check keyStore with this userId?
     * 6. ok all => next()
     */
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new AuthRequestError('Invalid Request')
    //2
    const keyStore = await findByUserId(userId)
    
    if (!keyStore) throw new  NotFoundRequestError('not found keyStore')
    //3
    const refreshToken = req.headers[HEADER.REFRESHTOKEN]
        
    if (refreshToken){
        try {
            
            const deCodeUser = Jwt.verify(refreshToken,keyStore.privateKey)
        
            if(userId !== deCodeUser.userId) throw new AuthRequestError ('Invalid Userid')
            
            req.keyStore = keyStore;
            req.user = deCodeUser;
            req.refreshToken = refreshToken;
            return next()
        } catch (error) {
            throw error
        }
    }
    
})

const verifyJWT = async (token,keySecret) =>{
    return await Jwt.verify(token,keySecret)
}
module.exports = {
    createTokenPair,
    authentication,
    authenticationV2,
    verifyJWT
}