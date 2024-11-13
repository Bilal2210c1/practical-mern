const mongoose = require("mongoose");

const userAccount_Model = mongoose.Schema(
    {
        user_Name: {
            type: String,
            required: [true, "User Name must be filled"]
        },

        user_Email: {
            type: String,
            required: [true, "User Email must be there and Valid"],
            unique: true, // Ensure email is unique
            lowercase: true // Make email lowercase before saving to DB
        },

        user_Password: {
            type: String,
            required: [true, "Password must contain 8 or more characters"],
            minlength: 8 // Enforce a minimum length of 8 characters
        }
    }
);

module.exports = mongoose.model("userAccounts", userAccount_Model);
