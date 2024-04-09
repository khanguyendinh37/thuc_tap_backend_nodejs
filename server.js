const app = require("./src/app");
const {serverPort } = require ('./src/configs/config')
const server  = app.listen(serverPort,()=>{
    console.log('>listen on port:',serverPort);
})
// process.on('SIGINT',()=>{
//     server.close(() => console.log('Exits server Express') )
// })