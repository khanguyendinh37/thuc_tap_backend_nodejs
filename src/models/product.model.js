
const {Schema,model} = require('mongoose')
const slugtify = require('slugify')
const DOCUMENT_NAME = 'Product'
const COLECTION_NAME = 'products'

const productShema =  new Schema({
    product_name : {
        type : String,
        required : true
    },
    product_thumb : {
        type: String,
        required : true
    },
    product_description : String, 
    product_slug : String,
    product_price : {
        type : Number,
        required :true
    },
    product_quantity : {
        type: Number,
        required :true
    },
    product_type :{
        type : String,
        required : true,
        enum : ['Electronics','Clothing','Furniture']
    },
    product_shop : {
        type : Schema.Types.ObjectId ,
        ref : 'Shop'
    },
    product_atributes : {
        type : Schema.Types.Mixed,
        required : true
    },
    product_ratingsAverage:{
        type: Number,
        default : 4.5,
        min :[1,'Ratting must be above 1.0'],
        max :[5,'Ratting must be below 5.0'],
        //làm tròn
        set : (val) => Math.round(val * 10)/10

    },
    product_variations : {
        type :Array,
        default : []
    },
    isDraft : {
        type :Boolean,
        default : true,
        index : true,
        select : false
    },
    isPublished  : {
        type :Boolean,
        default : false,
        index : true,
        select : false
    }

},{
    collection: COLECTION_NAME,
    timestamps : true
})
//document middlewere: runs before.save() and create()
productShema.pre('save',function(next){
    this.product_slug = slugtify(this.product_name,{lover : true})
    next();
})
//define  the product type = clothing
const clothingSchema = new Schema( {
    brand : {
        type : String,
        required: true
    },
    size : String,
    material : String,
    product_shop : {
        type : Schema.Types.ObjectId,
        ref : 'Shop'
    },
},{
    collection : 'clothes',
    timestamps : true
})
//define  the product type = electronic
const eclectronicSchema = new Schema( {
    manufacturer : {
        type : String,
        required: true
    },
    model : String,
    color : String,product_shop : {
        type : Schema.Types.ObjectId,
        ref : 'Shop'
    },
},{
    collection : 'electronics',
    timestamps : true
})

const furnitureSchema = new Schema({
   brand : {
        type : String,
        required: true
    },
    size : String,
    material : String,
    product_shop : {
        type : Schema.Types.ObjectId,
        ref : 'Shop'
    }
},{
    collection : 'furnitures',
    timestamps : true
})
module.exports = {
    product : model (DOCUMENT_NAME,productShema),
    clothing : model('Clothes',clothingSchema),
    electronic: model('Electronics',eclectronicSchema),
    furniture : model('Furnitures',furnitureSchema)
}