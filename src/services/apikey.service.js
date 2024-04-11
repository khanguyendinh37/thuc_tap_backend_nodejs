const apiKeyModel = require("../models/apiKey.model")
const crypto = require ('crypto')
const findByID = async (key ) =>{
    // const newkey = await apiKeyModel.create({key: crypto.randomBytes(64).toString('hex'),permissions: ['0000']});
    // console.log(newkey);
    const objkey = await apiKeyModel.findOne({key,status:true}).lean().collation({ locale: 'en' });
    return objkey
}

module.exports = {
    findByID
}