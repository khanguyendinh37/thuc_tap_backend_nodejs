
const express = require ('express');

const { asyncHandler } = require('../../helpers/asyncHandler');
const {  authenticationV2 } = require('../../auth/authUntils');
const productController = require('../../Controllers/product.controller');
const router = express.Router();


//authentication // 
router.use(authenticationV2)
//create product
router.post('',asyncHandler(productController.createProduct));

module.exports = router;