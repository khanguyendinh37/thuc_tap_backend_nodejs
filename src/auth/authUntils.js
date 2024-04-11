const Jwt = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/asyncHandler');
const { AuthRequestError } = require('../core/error.response');

const HEADER = {
    API_KEY : 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION :'authorization'

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
    
})
module.exports = {
    createTokenPair
}