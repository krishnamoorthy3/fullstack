const express=require('express');
const router=express.Router();
const { registerValidation } = require('../middleware/authValidation');
const { registerController } = require('../controllers/authController');
// Register Routes
router.post('/register',registerValidation,registerController);




module.exports=router;