const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require ('helmet');
const bodyParser = require('body-parser');
// const { checkOverLoad } = require('./helpers/check.connect');
const app = express();
//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
//init db
require('./dbs/init.mongodb')
//dung để kiểm tra sever và phát hiện sự quá tải của connect.
// checkOverLoad();
//init routers
app.use('',require('./routers'))

//handling error

app.use((req,res,next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error,req,res,next)=>{
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status : 'error',
        code : statusCode,
        message : error.message || 'Internal Sever Error'
    })
})

module.exports = app;