
const  mongoose = require("mongoose");

MONGO_URI = 'mongodb://127.0.0.1:27017/mytimesheet';
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
        .then(_=>console.log("Connect mongodb successfully"))
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