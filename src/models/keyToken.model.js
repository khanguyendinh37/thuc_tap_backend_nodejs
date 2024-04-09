const {Schema,model} = require('mongoose')
const DOCUMENT_NAME = 'Key'
const COLECTION_NAME = 'Keys'
var keyTokenSchema = new Schema({
    user : {
        type :Schema.Types.ObjectId,
        required :true,
        ref :'Shop'
    },
    publicKey:{
        type : String,
        required : true
    },
     privateKey:{
        type : String,
        required : true
    },
    refreshToken :{
        type : Array,
        default : []
    }
},{
    collation : COLECTION_NAME,
    timestamps :true
});

module.exports =  model(DOCUMENT_NAME,keyTokenSchema);