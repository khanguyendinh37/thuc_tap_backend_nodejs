
const { BadRequestError } = require('../core/error.response')
const { product , clothing ,electronic,furniture} = require('../models/product.model')
const { publishProductByShop, findAllDraftsForShop, findAllPulishForShops } = require('../repositories/product.repo')

// define Factory class to create product

class ProductFactory{
    /**
     * type : 'clothing' | 'electronic'
     * payload    
      */
    static productRegistry = {}
    static registerProductType (type,classRef){
        ProductFactory.productRegistry[type] = classRef
    }
    static async createProduct (type,payload){
        const productClass = ProductFactory.productRegistry[type]
        if(!productClass)throw new BadRequestError('Invalid Product Types',type)
        return new productClass(payload).createProduct()
       
    }
    //put
    static async publishProductByShop ({product_shop,product_id}){
        return publishProductByShop({product_shop,product_id})
    }
    // query
    static async findAllDraftForShop ({product_shop, limit = 50,skip = 0}){
        const query = {product_shop,isDraft: true}
        const getall = await findAllDraftsForShop({query,limit,skip})
        return getall
    }
    // query
    static async findAllPulishForShop ({product_shop, limit = 50,skip = 0}){
        const query = {product_shop,isPublished: true}
        const getall = await findAllPulishForShops({query,limit,skip})
        return getall
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
        const newElectronic = await electronic.create({
            ...this.product_atributes,
            product_shop : this.product_shop
        })
        if(!newElectronic) throw new BadRequestError('Create new Electronic Error')
        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError('Create new Electronic Error')
        return newProduct;
    }
}
//define sub-class difrent product types Furniture
class Furniture extends Product {
    async createProduct (){
        const newFurniture = await furniture.create({
            ...this.product_atributes,
            product_shop : this.product_shop
        })
      
        if(!newFurniture) throw new BadRequestError('Create new Furniture Error')
        const newProduct = await super.createProduct(newFurniture._id)
        if (!newProduct) throw new BadRequestError('Create new Electronic Error')
        return newProduct;
    }
}
//register product types
ProductFactory.registerProductType ('Clothing',Clothing)
ProductFactory.registerProductType ('Electronics',Electronic)
ProductFactory.registerProductType ('Furniture',Furniture)

module.exports = ProductFactory