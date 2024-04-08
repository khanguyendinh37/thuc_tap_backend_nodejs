const app = require("./src/app");

port = 3000;
const server  = app.listen(port,()=>{
    console.log('>listen on port:',port);
})
process.on('SIGINT',()=>{
    server.close(() => console.log('Exits server Express') )
})