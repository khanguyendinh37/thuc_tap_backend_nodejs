const { SuccessResponse } = require('../core/success.response')
const productModel = require('../models/product.model')
const ProductSevice = require('../services/product.service')

class ProductController {
    createProduct = async (req,res,next) =>{
       
        new SuccessResponse ({
            message :'Create new Product success',
            metaData : await ProductSevice.createProduct(req.body.product_type,
                {
                    ...req.body,
                    product_shop : req.user.userId
                })
        }).send(res)
    }
    PulishProductByShop = async (req,res,next) =>{
       
        new SuccessResponse ({
            message :'Create new Product success',
            metaData : await ProductSevice.publishProductByShop(
                {
                    product_id : req.params.id,
                    product_shop : req.user.userId
                })
        }).send(res)
    }
    //Query
    /**
     * @desc get all drafts for shop
     * @param {Number} limit 
     * @param {Number} skip 
     * @return {JSON}
     * 
     */
    getAllDraftsForShop = async (req,res,next )=>{
        new SuccessResponse({
            message : 'get All Draft for product success',
            metaData :await ProductSevice.findAllDraftForShop({
                product_shop : req.user.userId
            })
        }).send(res)
    }
    getPhulishForShop = async (req,res,next )=>{
        new SuccessResponse({
            message : 'get All Draft for product success',
            metaData :await ProductSevice.findAllPulishForShop({
                product_shop : req.user.userId
            })
        }).send(res)
    }

}

module.exports = new ProductController