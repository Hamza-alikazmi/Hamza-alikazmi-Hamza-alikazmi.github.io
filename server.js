const express = require('express');
const fs = require('fs').promises; // Use the Promise-based fs API
const path = require('path');
const app = express();
const port = 3000;

// Path to the db.json file
const dbFilePath = path.join(__dirname, 'db.json');

// Endpoint to fetch post data from db.json
app.get('/post', (req, res) => {
    // Read the db.json file asynchronously
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Failed to read data from db.json' });
        }

        try {
            // Parse the JSON data
            const posts = JSON.parse(data);

            // Send the data as a JSON response
            res.json(posts);
        } catch (parseError) {
            console.error('Error parsing db.json:', parseError);
            res.status(500).json({ error: 'Failed to parse data from db.json' });
        }
    });
});

// Serve static files (like HTML, CSS, JS) for the frontend
app.use(express.static('frontend'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
