const express=require('express');
const router=express.Router();
const { sendVerificationEmail,verifyOtp } = require('../controllers/verifyEmailController');
const {verifyEmailValidation,otpValidation} = require('../middleware/verifyemailValidation');

router.post('/verify-email',verifyEmailValidation, sendVerificationEmail);// send verification code to email

router.post('/verify-otp',otpValidation, verifyOtp)

module.exports = router;  