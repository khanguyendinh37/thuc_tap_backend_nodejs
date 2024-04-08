const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = this.require ('helmet')
const app = express ();
//init middleware
app.use(morgan(dev));
app.use(helmet());
app.use(compression());

//init db

//init routers

//handling error

module.exports = app;