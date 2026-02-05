
const Otp = require('../modules/otpModel');
const User = require('../modules/User');
const VerifiedEmail= require("../modules/VerifiedEmail")
const verifyEmailValidation = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email field is required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
         // Duplicate user check
                const existingUser = await User.findOne({ email });
        
                if (existingUser) {
                    return res.status(409).json({
                        success:false,
                        message: "User already exists"
                    });
                }
        
                const isVerified=await VerifiedEmail.findOne({email});
                if(isVerified) {
                    await VerifiedEmail.deleteOne({ email });
                }

        const existingOtp = await Otp.findOne({ email });
        if (existingOtp){
        const resendAfter = new Date(existingOtp.createdAt).getTime() + parseInt(process.env.RESEND_OTP_INTERVAL_SECONDS) * 1000;
        if (existingOtp && resendAfter < Date.now()) {
            await existingOtp.deleteOne({ email });
        } else if (existingOtp) {
            return res.status(400).json({
                success: false,
                message: `Try after ${parseInt(process.env.RESEND_OTP_INTERVAL_SECONDS)} Secounds`
            });
        }
        }

        next();

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Error in email validation middleware",
            error: err.message
        });
    }
}


const otpValidation = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP fields are required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
            return res.status(400).json({
                message: "OTP must be a 6-digit number"
            });
        }

        const existingOtp = await Otp.findOne({ email });

        if (!existingOtp) {
            return res.status(400).json({
                message: "No OTP found for the provided email"
            });
        }

        next();

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Error in OTP validation middleware",
            error: err.message
        });
    }
}


module.exports = { verifyEmailValidation, otpValidation };