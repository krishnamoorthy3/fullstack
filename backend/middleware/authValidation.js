const User = require('../modules/User');
const VerifiedEmail= require("../modules/VerifiedEmail")
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
        next();

    } catch (err) {
        console.error("Register Validation Error:", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};



module.exports = { registerValidation };