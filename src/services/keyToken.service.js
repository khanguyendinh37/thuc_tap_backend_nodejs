const { token } = require("morgan");
const keyTokenModel = require("../models/keyToken.model");
const { update } = require("lodash");
const { Types } = require("mongoose");

class keyTokenService {
    static createKeyToken = async ({userId,publicKey,privateKey,refreshToken}) =>{
        try {
            // const publicKeyString = publicKey.toString();
            // const privateKeyString = publicKey.toString();
            //lv0
            // const tokens = await keyTokenModel.create({
            //     user:userId,
            //     publicKey ,
            //     privateKey
            // })
            // return token ? tokens.publicKey : null
            //lv pro
            const filter = {
                user : userId, 
               
            }, update = {
                   publicKey,privateKey,refreshTokenUsed : [],refreshToken
                },options = {
                    upsert : true,new : true}
            const token = await keyTokenModel.findOneAndUpdate(filter,update,options)
            return token ? token.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId)=>{
        return await keyTokenModel.findOne({user: userId}).lean().collation({ locale: 'en' });
    }
    static removeKeyById = async (id) => {
        console.log(id)
        return await keyTokenModel.findOneAndDelete({_id: id});
    }
    static findByrefreshTokenUsed = async (refreshToken) =>{
        return await keyTokenModel.findOne({refreshTokenUsed : refreshToken}).lean().collation({ locale: 'en' });
    }
    static deleteKeyById = async (userId) =>{
        return await keyTokenModel.findOneAndDelete({user:userId}).lean().collation({ locale: 'en' });
    }
    static findByRefreshToken = async (refreshToken) =>{
        return await keyTokenModel.findOne({refreshToken:refreshToken}).lean().collation({ locale: 'en' })
    }
     static findByUpdateRefreshToken = async (_id,refreshToken,tokens) =>{
        return await keyTokenModel.findOneAndUpdate({user : _id},{refreshToken:tokens.refreshToken,refreshTokenUsed:refreshToken})
    }
}

module.exports = keyTokenService