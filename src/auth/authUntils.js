const Jwt = require('jsonwebtoken')
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
module.exports = {
    createTokenPair
}