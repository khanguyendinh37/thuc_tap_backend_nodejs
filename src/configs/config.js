const dotenv = require ('dotenv');
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_HOST = process.env.DB_HOST_IPV4 || localhost;
const DB_NAME = process.env.DB_nAME || timesheet;
const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_URI =  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}` ||`mongodb://127.0.0.1:27017/mytimesheet`

const CONNECTDB = {
    host : DB_HOST,
    port : DB_PORT,
    name : DB_NAME,
    username : DB_USERNAME,
    password : DB_PASSWORD,
    Uri :DB_URI
}
module.exports = {
        connectDb : CONNECTDB,
        serverPort : SERVER_PORT
}