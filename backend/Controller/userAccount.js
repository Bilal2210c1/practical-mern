const Users = require("../Models/userAccount");  // Correct import

// METHOD -- POST 
// API http://localhost:5000/user
// Description: Create a new user

async function createUser(req, res) {
    const { user_Name, user_Email, user_Password } = req.body;

    const userNameCheck = /^[a-zA-Z0-9_]+$/;  // Alphanumeric and underscores only
    const userEmailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;  // Basic email format validation

    if (userNameCheck.test(user_Name) && userEmailCheck.test(user_Email)) {
        // Check if the email already exists
        const exists = await Users.find({ user_Email: user_Email.toLowerCase() });

        if (exists.length > 0) {
            return res.send({ "error": "Email is already registered" });
        }

        // Create new user
        const newUser = await Users.create({
            user_Name: user_Name.toLowerCase(),
            user_Email: user_Email.toLowerCase(),
            user_Password: user_Password  // In real-world, make sure to hash the password!
        });

        return res.send({ "data": req.body });
    } else {
        return res.send({ "error": "Username or email format is incorrect" });
    }
}

// METHOD -- GET 
// API http://localhost:5000/user
// Description: Get all users

async function getAllUsers(req, res) {
    const allUsers = await Users.find();
    return res.send({ "data": allUsers });
}

// METHOD -- DELETE 
// API http://localhost:5000/user/:user_Name
// Description: Delete a single user by username

async function deleteUser(req, res) {
    const { user_Name } = req.params;

    const deleteUser = await Users.deleteOne({ user_Name: user_Name.toLowerCase() });

    if (deleteUser.deletedCount === 0) {
        return res.send({ "error": "User not found" });
    }

    return res.send({ "message": "User deleted successfully" });
}

// METHOD -- PUT 
// API http://localhost:5000/user/:user_Name
// Description: Update user information

async function updateUser(req, res) {
    const { user_Name } = req.params;
    const { user_Name: newUserName, user_Email, user_Password } = req.body;

    const existingUser = await Users.findOne({ user_Name: user_Name.toLowerCase() });

    if (existingUser) {
        const updateUser = await Users.updateOne(
            { user_Name: user_Name.toLowerCase() },
            {
                $set: {
                    user_Name: newUserName.toLowerCase(),
                    user_Email: user_Email.toLowerCase(),
                    user_Password: user_Password  // Ensure password is hashed in production
                }
            }
        );

        return res.send({ "data": req.body });
    } else {
        return res.send({ "error": "User not found" });
    }
}

module.exports = { createUser, getAllUsers, deleteUser, updateUser };
