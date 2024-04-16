
const { BadRequestError } = require('../core/error.response')
const { product , clothing ,electronic} = require('../models/product.model')

// define Factory class to create product

class ProductFactory{
    /**
     * type : 'clothing' | 'electronic'
     * payload    
      */

    static async createProduct (type,payload){
        switch ( type){
            case 'Electronics':
                return new Electronic(payload).createProduct()
            case 'Clothing' : 
                return new Clothing (payload).createProduct()
            default:
                throw new BadRequestError('Invalid Product Types',type)
        }
    }
}

//define base product  class
class Product {
    constructor ({
        product_name ,product_thumb, product_description,product_price
        ,product_quantity, product_type,  product_shop,product_atributes
    }){
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_atributes = product_atributes
    }
    //create new product 
    async createProduct (product_id){
        return await product.create({...this,_id:product_id})
    }
}
//define sub-class difrent product types clothing
class Clothing extends Product {
    async createProduct (){
        const newClothing = await clothing.create ({
            ...this.product_atributes,
            product_shop : this.product_shop
        })
        if(!newClothing) throw new BadRequestError('Create new clothing Error ')
        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError('Create new Product Error ')
        return newProduct;
    }
}
//define sub-class difrent product types Electronic
class Electronic extends Product {
    async createProduct (){
        const newElectronic = await electronic.create ({
            ...this.product_atributes,
            product_shop : this.product_shop
        })
        if(!newElectronic) throw new BadRequestError('Create new Electronic Error')
        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError('Create new Electronic Error')
        return newProduct;
    }
}

module.exports = ProductFactory