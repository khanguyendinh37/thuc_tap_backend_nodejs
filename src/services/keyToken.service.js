const { token } = require("morgan");
const keyTokenModel = require("../models/keyToken.model");

class keyTokenService {
    static createKeyToken = async ({userId,publicKey,privateKey}) =>{
        try {
            // const publicKeyString = publicKey.toString();
            // const privateKeyString = publicKey.toString();
            const tokens = await keyTokenModel.create({
                user:userId,
                publicKey ,
                privateKey
            })
            return token ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = keyTokenService