const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Import the CORS package
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all domains (you can be more restrictive with this if needed)
app.use(cors());

// Path to the db.json file
const dbFilePath = path.join(__dirname, 'db.json');

// Endpoint to fetch post data from db.json
app.get('/post', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Failed to read data from db.json' });
        }

        try {
            const posts = JSON.parse(data);
            res.json(posts);
        } catch (parseError) {
            console.error('Error parsing db.json:', parseError);
            res.status(500).json({ error: 'Failed to parse data from db.json' });
        }
    });
});

// Serve static files (like HTML, CSS, JS) for the frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Catch-all route for other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
