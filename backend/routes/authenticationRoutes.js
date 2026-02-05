const express=require('express');
const router=express.Router();
const { registerValidation,loginValidation } = require('../middleware/authValidation');
const { registerController,loginController, refreshController } = require('../controllers/authController');
const { checkRefreshToken } = require('../middleware/jwtValidation');
// Register Routes
router.post('/register',registerValidation,registerController);

router.post("/login",loginValidation,loginController)

router.post("/refresh",checkRefreshToken,refreshController)

module.exports=router;