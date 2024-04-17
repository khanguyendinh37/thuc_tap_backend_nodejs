const {model,Schema} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Shop'
const COLECTION_NAME = 'shops'
// Declare the Schema of the Mongo model
var userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength : 150
    },
    email:{
        
        type:String,
        required:true,
        unique:true,
        trim :true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum :['active','inactive'],
        default:'inactive'
    },
    verfify: {
        type : Schema.Types.Boolean,
        default : false
    },
    roles :{
        type :Array,
        default : []
    }
},{
    timestamps:true,
    collection: COLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);