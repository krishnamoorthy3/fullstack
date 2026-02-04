const User = require('../models/User');

const registerValidation = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Required field validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Password strength validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must contain uppercase, lowercase, number, special character and 8+ characters"
            });
        }

        // Duplicate user check
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
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



export {registerValidation}