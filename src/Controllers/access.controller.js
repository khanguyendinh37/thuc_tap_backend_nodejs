const { CREATED, SuccessResponse } = require('../core/success.response');
const AccessService = require ('../services/access.service')
 

class AccessController {
    logout = async(req,res,next ) =>{
        
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

}

module.exports = new AccessController();