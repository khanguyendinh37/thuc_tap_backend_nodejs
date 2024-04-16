const { CREATED, SuccessResponse } = require('../core/success.response');
const AccessService = require ('../services/access.service')
 

class AccessController {
    logout = async(req,res,next ) =>{
         new SuccessResponse({
            message :'logout Success',
            metaData : await AccessService.logout(req.keyStore)
        }).send(res)
    }
    Login = async(req,res,next) => {
        new SuccessResponse({
            metaData : await AccessService.login(req.body)
        }).send(res)
    }
    SignUp = async (req,res,next)=>{
          
        new CREATED ({
            message :'Regiserted ok!',
            metaData : await AccessService.SingUp(req.body),
            options :{
                limit :10
            }
        }).send(res)
       
        
    }
    handlerefreshToken = async (req,res,next) =>{
      
        //-<version 2>-
       new SuccessResponse ({
            message :'Get token  success',
            metaData: await AccessService.hendleRefreshTokenV2({
                refreshToken: req.refreshToken,
                user : req.user,
                keyStore : req.keyStore
            })
       }).send(res)
        // new SuccessResponse({
        //     message :'Get Token success !',
        //     metaData : await AccessService.hendleRefreshToken(req.body.refreshToken)
        // }).send(res) //version 1
    }  

}

module.exports = new AccessController();