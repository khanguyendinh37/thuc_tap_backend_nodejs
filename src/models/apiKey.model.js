// key !debug install by Mongo snippets for node-js
const {model,Schema } = require('mongoose')

const DOCUMENT_NAME ='Apikey'
const COLECTION_NAME = 'Apikeys'

const apiKeySchame =new  Schema({
    key:{
        type : String,
        required :true,
        unipue : true
    },
    status : {
        type : Boolean,
        default :true
    },
    permissions: {
        type :[String],
        required : true,
        enum : ['0000','1111','2222']
    }
},{
  timestamps : true,
  collation : COLECTION_NAME  
});
module.exports = model(DOCUMENT_NAME,apiKeySchame);