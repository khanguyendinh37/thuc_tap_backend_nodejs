const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require ('helmet');
// const { checkOverLoad } = require('./helpers/check.connect');
const app = express ();
//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

//init db
require('./dbs/init.mongodb')
//dung để kiểm tra sever và phát hiện sự quá tải của connect.
// checkOverLoad();
//init routers

//handling error

module.exports = app;