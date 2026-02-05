const User = require('../modules/User');
const VerifiedEmail= require("../modules/VerifiedEmail")
const {comparePassword} =require("../utils/bcryptPassword")
const registerValidation = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Required field validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success:false,
                message: "Invalid email format"
            });
        }

        // Password strength validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success:false,
                message:
                    "Password must contain uppercase, lowercase, number, special character and 8+ characters"
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
        if(!isVerified) {
            return res.status(400).json({
                success:false,
                message: "Verify the Email before registering"
            });
        }

        const now = Date.now();
        const verifiedTime = new Date(isVerified.verifiedAt).getTime();

        // ⏱ check 30 min expiry
        if (now - verifiedTime >  30 * 60 * 1000) {
        await VerifiedEmail.deleteOne({ email });

        return res.status(410).json({
            message: "Verification expired. Please verify again."
        });
        }
        next();

    } catch (err) {
        console.error("Register Validation Error:", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const loginValidation=async(req,res,next)=>{
    try{
 const {  email, password } = req.body;

        // Required field validation
        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success:false,
                message: "Invalid email format"
            });
        }

        // Password strength validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success:false,
                message:
                    "Password must contain uppercase, lowercase, number, special character and 8+ characters"
            });
        }

        // Duplicate user check
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(409).json({
                success:false,
                message: "User not exists"
            });
        }

        const ispasswordMatch=await comparePassword(password,existingUser.password)
        if(!ispasswordMatch){
            return res.status(400).json({
                success:false,
                message:
                    "Password does not match"
            });
        }
        next();
    }catch(err){
        console.error("login Validation Error:", err);

        return res.status(500).json({
            message: "Login in validation"
        });
    }
}

module.exports = { registerValidation,loginValidation };