const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUntils");
const { format } = require("path");
const { getInforData } = require("../utils");
const RoleShop = {//thực thi code phải chuyển qua ký hiệu
    SHOP : 'shop',
    WRITER :'writer',
    EDITOR :'editor',
    ADMIN :'admin'
}

class AccessService{
    static SingUp = async ({name,email,password,mobile})=>{
        try {
        
            const hoderShop  = await shopModel.findOne({email:email}).lean().collation({ locale: 'en' });
           
            if(hoderShop){
                return {
                    code:401,
                    message : 'Shop already registered'
                }
            }
            const hashpassword = await bcrypt.hash(password,10);
         
            const newShop = await shopModel.create({
                name ,email,password: hashpassword,mobile,roles :[RoleShop.SHOP]
            })
           
            if(newShop){
                //create privatekey ,publickey --> supers key
                // const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                //    modulusLength: 4096,
                //    publicKeyEncoding:{
                //     type :'pkcs1',
                //     format:'pem'
                //    },
                //     privateKeyEncoding:{
                //     type :'pkcs1',
                //     format:'pem'
                //    }
                // })
                //public key CrytoGraphy Standards has lv eight
                //-->key version easy
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
                console.log ({privateKey,publicKey})//save colecton key store

                const keysStore = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey ,
                    privateKey
                })
                if (!keysStore){
                    return {
                        code : '500',
                        message :'publickeystring error'
                    }
                }
            //     const publickeyObjcect = crypto.createPublicKey(publickeyString)
            //    // create token pair 
               const token  = await createTokenPair({userId:newShop._id,email},publicKey,privateKey);
               console.log ('Create Token Success: ',token);
               return {
                code : 201,
                metadata :{
                    Shop: getInforData({fileds :['_id','name','email'],object :newShop}),
                    token
                }
               }
            }
            return {
                code : 200,
                metadata :null
            }
        } catch (error) {
            return {
                code:500,
                message :error.message,
                status:'error'
            }
        }
    }
}
module.exports = AccessService;