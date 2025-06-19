const express = require('express');
const User = require('./../Models/user')
const router = express.Router();
// POST route to add a person
router.post('/signup', async (req, res) => {

    try {
        const data = req.body // Assuming the request body contains the User data

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User Email is already exits' });
        }

        // Create a new User document using the Mongoose model
        const newUser = new User(data);

        // Save the new user to the database
        const response = await newUser.save();
        console.log('data saved');

        res.status(200)
        return res.json({ data: response });
    } catch (err) {
        return res.status(500)

    }
})// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if Email or password is missing
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by Email
        const user = await User.findOne({ email: email });

        // If user does not exist, return error
        if (!user) {
            return res.status(401).json({ error: 'Invalid Email or Password' });
        }

        // Check password
        if (user.password === password) {
            return res.json({ user, status: "Login Successfully" });   
        } else {
            return res.status(401).json({ error: 'Invalid Email or Password' });
        } // ← Added missing closing brace

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error' }); // ← Added complete response
    }
});


router.patch('/update/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const email = req.body.email; // Extract the id from the token
        const { name, password} = req.body; // Extract current and new passwords from request body

        // Check if currentPassword and newPassword are present in the request body
        if (!name|| !password || !email || !_id) {
            return res.status(400).json({ error: 'Data Are required' });
        }

        // Find the user by userID
        const user = await User.findOne({ _id: _id });

        // If user does not exist or password does not match, return error
        if (!user) {// function chhe
            return res.status(400).json({ error: 'Invalid current password' });
        }

        // Update the user's password
        user.password = password;
        user.name = name;
        user.email = email;

        await user.save();

        res.status(200);
        return res.json({ Message: "Done" })
    } catch (err) {
        console.error(err);
        res.status(500);
        return res.send("Error")
    }
});

router.delete('/delete-user/:_id', async (req, res) => {
    try {
        const _id = req.params._id; // Extract current and new passwords from request body
        // Find the user by userID
        const deletedUser = await User.findByIdAndDelete(_id);
        
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500);
        return res.send("Error")
    }
});

router.get('/detail/:_id', async (req, res) => {
    try {
        const _id = req.params._id; // Extract current and new passwords from request body
        // Find the user by userID
        const user = await User.findOne({ _id: _id });

        if (!user) {
            return res.send("Error")
        }
        return res.json({ user })
    } catch (err) {
        console.error(err);
        res.status(500);
        return res.send("Error")
    }
});

router.get('/', async (req, res) => {
    try{
        // Find the user by userID
        const user = await User.find();

        if (!user) {
            return res.send("Error")
        }
        return res.json({ user })
    } catch (err) {
        console.error(err);
        res.status(500);
        return res.send("Error")
    }
});
module.exports = router;
