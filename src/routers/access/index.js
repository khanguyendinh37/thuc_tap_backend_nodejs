
const express = require ('express');
const accessController = require('../../Controllers/access.controller');
const router = express.Router();

router.post('/shop/signup',accessController.SignUp);
module.exports = router;