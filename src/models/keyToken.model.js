const {Schema,model} = require('mongoose')
const DOCUMENT_NAME = 'Key'
const COLECTION_NAME = 'keys'
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
    refreshTokenUsed :{
        type : Array,
        default : [] //refresh token đã được sử dụng
    },
    refreshToken:{
        type : String,
        required : true
    }
},{
    collection : COLECTION_NAME,
    timestamps :true
});

module.exports =  model(DOCUMENT_NAME,keyTokenSchema);