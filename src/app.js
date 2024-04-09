const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require ('helmet')
const app = express ();
//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

//init db
require('./dbs/init.mongodb')
//init routers

//handling error

module.exports = app;