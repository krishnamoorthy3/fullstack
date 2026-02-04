const express=require('express');
const router=express.Router();
const { registerValidation } = require('../middleware/authValidation');

// Register Routes
router.post('/register',registerValidation);