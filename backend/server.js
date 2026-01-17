const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// You must set the MONGO_URI in the .env file
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-farm-db')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- Routes ---

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ success: false, message: "Username, password, and email are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username or Email already exists" });
        }

        // Create new user
        // Note: In a production app, you should hash the password before saving!
        const newUser = new User({
            username,
            email,
            password,
            phone,
            settings: { smsEnabled: false }
        });

        await newUser.save();

        console.log(`New user registered: ${username} (${email})`);
        res.json({ success: true, message: "Registration successful", user: newUser });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body; // 'username' here can be username or email

        // Find user by username OR email
        const user = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });

        if (user && user.password === password) {
            console.log(`User logged in: ${user.username}`);
            res.json({ success: true, message: "Login successful", user });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: "Server error during login" });
    }
});

// Update Phone/Settings
app.post('/api/update-settings', async (req, res) => {
    try {
        const { username, phone, smsEnabled } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update fields
        if (phone !== undefined) user.phone = phone;
        if (smsEnabled !== undefined) user.settings.smsEnabled = smsEnabled;

        await user.save();

        res.json({ success: true, message: "Settings updated", user });

    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ success: false, message: "Server error during update" });
    }
});

const Observation = require('./models/Observation');

// ... existing routes ...

// Manual Entry Submission
app.post('/api/manual-entry', async (req, res) => {
    try {
        const { username, soil, plant, weather } = req.body;

        if (!username || !soil || !plant || !weather) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newObservation = new Observation({
            username,
            soil,
            plant,
            weather
        });

        await newObservation.save();

        console.log(`New observation logged for: ${username}`);
        res.json({ success: true, message: "Observation saved successfully", observation: newObservation });

    } catch (error) {
        console.error('Manual entry error:', error);
        res.status(500).json({ success: false, message: "Server error during manual entry" });
    }
});

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);
});
