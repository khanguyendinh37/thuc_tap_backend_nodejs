const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUntils");
const { format } = require("path");
const { getInforData } = require("../utils");
const {ForbiddenRequestError, AuthRequestError, ForbiddenError} = require('../core/error.response');
const { finByEmail } = require("./shop.service");
const { delay } = require("lodash");
const RoleShop = {//thực thi code phải chuyển qua ký hiệu
    SHOP : 'shop',
    WRITER :'writer',
    EDITOR :'editor',
    ADMIN :'admin'
}

class AccessService{
    static SingUp = async ({name,email,password,mobile})=>{
        // try {
        
            const hoderShop  = await shopModel.findOne({email:email}).lean().collation({ locale: 'en' });
           
            if(hoderShop){
                throw new ForbiddenRequestError ('Shop already registered',401)
                
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
                // console.log ({privateKey,publicKey})//save colecton key store

                const keysStore = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey ,
                    privateKey
                })
                if (!keysStore){
                    throw new ForbiddenRequestError('publickeystring error')
                   
                }
            //     const publickeyObjcect = crypto.createPublicKey(publickeyString)
            //    // create token pair 
               const token  = await createTokenPair({userId:newShop._id,email},publicKey,privateKey);
            //    console.log ('Create Token Success: ',token);
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
        // } catch (error) {
        //     return {
        //         code:500,
        //         message :error.message,
        //         status:'error'
        //     }
        // }
    }

    /**?
     * 1 check email in dbs
     * 2 match password
     * 3 create AT vs RT and save
     * 4 generate tokens
     * 5 get dât return login
     */
    static login = async ({email,password,refreshToken = null})=>{
        //1.
        const foundShop = await finByEmail({email})
        if(!foundShop) throw new ForbiddenRequestError('Shop not registered')
        //2.
        const match = bcrypt.compare(password,foundShop.password)
        if(!match)throw new AuthRequestError('Authentication error')
        //3. 
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        //4.
        const {_id:userId} = foundShop
        const token  = await createTokenPair({userId,email},publicKey,privateKey);
        await keyTokenService.createKeyToken({
            userId,
            refreshToken : token.refreshToken,
            privateKey,publicKey
        })
        return {
       
            metadata :{
                Shop: getInforData({fileds :['_id','name','email'],object :foundShop}),
                token
            }
        }
    } 

    static logout = async (keyStore)=>{
       
        const delKey = await keyTokenService.removeKeyById(keyStore._id);
        return delKey ;
    }

    /**
     * check token used?
     * 
     */
    // static hendleRefreshToken = async (refreshToken) =>{
    //     const foundToken = await keyTokenService.findByrefreshTokenUsed(refreshToken)
    //     if(foundToken){
    //         //bắt token used
    //         const {userId,email} = await verifyJWT(refreshToken,foundToken.privateKey)
    //         //delete key
    //         await keyTokenService.deleteKeyById(userId);
            
    //         throw new ForbiddenError('something wrong happend and pls relogin')
    //     }
    //     //No FoundToken
    //     const hoderToken = await keyTokenService.findByRefreshToken(refreshToken)
    //     if(!hoderToken) throw new AuthRequestError('Shop not registeted')
    //     //verifyToken
    //      const {userId,email} = await verifyJWT(refreshToken,hoderToken.privateKey)
    //      const foundShop = await finByEmail({email:email})
    //      if(!foundShop) throw new AuthRequestError ('shop not registeted')
    //     //create new Tokens
    //     const tokens = await createTokenPair({userId,email},hoderToken.publicKey,hoderToken.privateKey);
    //     //update token
    //     await keyTokenService.findByUpdateRefreshToken(userId,refreshToken,tokens)
    //     return {
    //         user: {userId,email},
    //         tokens
    //     }
    // }

    static hendleRefreshTokenV2 = async ({keyStore,user,refreshToken}) =>{
        
        const {userId,email} = user;
        if(keyStore.refreshTokenUsed.includes(refreshToken)){
            await keyTokenService.deleteKeyById(userId)
            throw new ForbiddenError ('Something wrong happend !! Pls relogin')
        }
        if(keyStore.refreshToken !== refreshToken) throw new AuthRequestError("shop not regissted")
         const foundShop = await finByEmail({email:email})
         if(!foundShop) throw new AuthRequestError ('shop not registeted')
        //create new Tokens
        const tokens = await createTokenPair({userId,email},keyStore.publicKey,keyStore.privateKey);
        //update token
        await keyTokenService.findByUpdateRefreshToken(userId,refreshToken,tokens)
       
        return {
            user,
            tokens
        }
    }
}
module.exports = AccessService;