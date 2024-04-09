const AccessService = require ('../services/access.service')
 

class AccessController {
    SignUp = async (req,res,next)=>{
        try {
            
            return res.status(201).json (
                await AccessService.SingUp(req.body)
               
            )
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AccessController();