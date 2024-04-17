const shopModel = require("../models/shop.model")

const finByEmail = async ({email,select = {
    email:1 , password : 1, name : 1, status : 1,roles : 1
}})=>{
    return await shopModel.findOne({email}).select(select).lean();
}

module.exports = {
    finByEmail
}