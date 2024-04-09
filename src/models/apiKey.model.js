// key !debug install by Mongo snippets for node-js
const {model,Schema } = require('mongoose')

const DOCUMENT_NAME ='Apikey'
const COLECTION_NAME = 'Apikeys'

const apiKeySchame = Schema({
    key:{
        type : String,
        required :true,
        unipue : true
    },
    status : {
        type : Boolean,
        default :true
    }
})