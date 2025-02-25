const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

module.exports = (req, res) => {
    // Path to the db.json file within the Vercel deployment (ensure it's in a static directory)
    const dbFilePath = path.join(__dirname, 'data', 'db.json');

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
            res.status(200).json(posts);
        } catch (parseError) {
            console.error('Error parsing db.json:', parseError);
            res.status(500).json({ error: 'Failed to parse data from db.json' });
        }
    });
};

// Serve static files (like HTML, CSS, JS) for the frontend
app.use(express.static('frontend'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
