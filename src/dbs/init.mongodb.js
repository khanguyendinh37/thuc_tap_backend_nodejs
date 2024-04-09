
const  mongoose = require("mongoose");
//dùng để kiểm tra connect của mongodb
const {countConnect} = require ('../helpers/check.connect');
const { connectDb } = require("../configs/config");

MONGO_URI = connectDb.Uri;
class Databse {
    constructor (){
        this.connect()
    }
    //connect
    connect(type = 'mongodb'){
        //dev
        if(1 === 1){
            mongoose.set('debug',true)
            mongoose.set('debug',{color:true})
        }
        mongoose.connect(MONGO_URI,{
            
            maxPoolSize :50
        })
        .then(_=>{
            console.log("Connect mongodb successfully");
            countConnect();            
        })
        .catch((error)=> console.log('connect to db false :',error))
    }
    static getInstance(){
        if(!Databse.instance){
            Databse.instance = new Databse()
        }
        return Databse
    }
}
const instanceMongoDB = Databse.getInstance()
module.exports = instanceMongoDB;