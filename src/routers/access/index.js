
const express = require ('express');
const accessController = require('../../Controllers/access.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUntils');
const router = express.Router();

//signUp
router.post('/shop/signup',asyncHandler(accessController.SignUp));
//login 
router.post('/shop/login',asyncHandler(accessController.Login));
//authentication // 
router.use(authentication)
//logout
router.post('/shop/logout',asyncHandler(accessController.logout));
module.exports = router;