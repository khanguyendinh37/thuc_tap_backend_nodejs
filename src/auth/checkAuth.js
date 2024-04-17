const apiKeyModel = require("../models/apiKey.model");
const { findByID } = require("../services/apikey.service");

const HEADER = {
    API_KEY  :'x-api-key',
    AUTHORIZATION : 'authorization'
}

const apiKey = async (req,res ,next )=>{
    try {
       const key = req.headers[HEADER.API_KEY]?.toString();
        if(!key){
            return res.status(403).json({
                message : 'Forrbidden Error1'
            })
        }
        //check objkey
        const objkey  = await findByID(key);
        if(!objkey){
            return res.status(403).json({
                message:'Forrbidden Error2'
            })
        }
        req.objkey = objkey
        return next()
    } catch (error) {
        return res.status(500).json({
             error : 500,
             message:error.message
        })
    }
} 
const permission = (permission) =>{
    return (req,res,next) =>{
        if(!req.objkey.permissions){
            return res.status(403).json ({
                message : 'permission denied'
            })
        }
        console.log('::permissions :: ',req.objkey.permissions)
        const validPermission = req.objkey.permissions.includes(permission);
        if (!validPermission){
            return res.status(403).json({
                message : 'permission denied'
            })
        }
        return next()
    }
}




module.exports = { 
    apiKey,
    permission,
   
}