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
}

module.exports = new ProductController