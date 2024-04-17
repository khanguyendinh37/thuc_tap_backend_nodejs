
const express = require ('express');

const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, authenticationV2 } = require('../../auth/authUntils');
const productController = require('../../Controllers/product.controller');
const router = express.Router();


//authentication // 
router.use(authentication)
//create product
router.post('',asyncHandler(productController.createProduct));
router.post('/pulish/:id',asyncHandler(productController.PulishProductByShop));
//query
router.get ('/drafts/all',asyncHandler(productController.getAllDraftsForShop))
router.get ('/pulished/all',asyncHandler(productController.getPhulishForShop))

module.exports = router;