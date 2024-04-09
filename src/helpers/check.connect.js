//check xem có bao nhiêu connect với mongodb

const mongoose = require('mongoose');
const os = require ('os');
const process = require('process');
const _seconds = 5000;
//count connect
const countConnect = () =>{
    const numConnect = mongoose.connections.length;
    console.log("Number of connections :: ",numConnect);
}
//check over load 
const checkOverLoad = () =>{
    setInterval(()=>{
         const numConnect = mongoose.connections.length;
         const numCores = os.cpus().length;
         const memoryUsage = process.memoryUsage().rss;
         //vd : giới hạn của máy chỉ có chịu của máy chỉ có 5 connection
         const maxConnection = numCores * 5;

         console.log ('Active connections : ',numConnect);
         console.log ('Memory usage :',(memoryUsage/1024/1024),"MB");
         //neus vượt qua giới hạn connection thì bào nâng cấp server 
         if( numConnect > maxConnection){
            console.log ('Connection overload detected');
         }
    },_seconds);//Monitor every 5 s
}
module.exports = {
    countConnect,
    checkOverLoad
}