
const { Types } = require("mongoose");
const { product } = require("../models/product.model");

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await queryProduct ({query,limit,skip})
           
};
const findAllPulishForShops = async ({ query, limit, skip }) => {
  return await queryProduct ({query,limit,skip})
           
};

const publishProductByShop  = async ({product_shop,product_id}) =>{
    const foundShop =  await product.findOne({
        product_shop : product_shop,
        _id :product_id
    })
    if(!foundShop) return null;
    foundShop.isDraft = false
    foundShop.isPublished = true
    const {modifiedCount} = await foundShop.update(foundShop);
    return modifiedCount
}

const queryProduct = async ({ query, limit, skip }) => {
  return await product.find(query)
            .populate('product_shop','name email -_id')
            .sort({updateAt :-1})
            .skip(skip)
            .limit(limit)
            .lean()
            .exec()
           
};
module.exports = {
    findAllDraftsForShop,
    findAllPulishForShops,
    publishProductByShop,
    
};
