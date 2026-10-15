const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory database mock for demonstration purposes
let users = [
    { id: 1, name: 'Alice Smith', role: 'Developer' },
    { id: 2, name: 'Bob Jones', role: 'Designer' }
];

// ==========================================
// API 1: Health Check / Status Endpoint
// ==========================================
app.get('/api/status', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running and merged successfully!',

        timestamp: new Date().toISOString()
    });
});

// ==========================================
// API 2: Get All Users (GET)
// ==========================================
app.get('/api/users', (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// ==========================================
// API 3: Create a New User (POST)
// ==========================================
app.post('/api/users', (req, res) => {
    const { name, role } = req.body;

    // Simple validation
    if (!name || !role) {
        return res.status(400).json({
            success: false,
            error: 'Please provide both name and role.'
        });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        role
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running live at http://localhost:${PORT}`);
});