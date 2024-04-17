
const express = require ('express');
const accessController = require('../../Controllers/access.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authenticationV2, authentication } = require('../../auth/authUntils');
const router = express.Router();

//signUp
router.post('/shop/signup',asyncHandler(accessController.SignUp));
//login 
router.post('/shop/login',asyncHandler(accessController.Login));



//logout
router.post('/shop/logout',authentication,asyncHandler(accessController.logout));

//refreshToken
router.post('/shop/handleRefreshToken',authenticationV2,asyncHandler(accessController.handlerefreshToken))
module.exports = router;