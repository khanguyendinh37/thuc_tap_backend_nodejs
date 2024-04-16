
const express = require ('express');
const accessController = require('../../Controllers/access.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authenticationV2 } = require('../../auth/authUntils');
const router = express.Router();

//signUp
router.post('/shop/signup',asyncHandler(accessController.SignUp));
//login 
router.post('/shop/login',asyncHandler(accessController.Login));

//authentication // 
router.use(authenticationV2)
//logout
router.post('/shop/logout',asyncHandler(accessController.logout));
//refreshToken
router.post('/shop/handleRefreshToken',asyncHandler(accessController.handlerefreshToken))
module.exports = router;