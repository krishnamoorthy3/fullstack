const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [/^\S+@\S+.\S+$/, "Enter valid Email Format"],
    },
    password: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: new Date()
    },
    updatedDates: [
        {
            type: Date,
            default: Date.now()
        }
    ],
    isActive: {
        type: Boolean,
        default: true,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
