const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Path to the db.json file (adjust according to your project structure)
const dbFilePath = path.join(__dirname, 'data', 'db.json');

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static('frontend'));

// Utility function to read db.json file
const readDbFile = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dbFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err); // Reject with the error if file read fails
            }
            try {
                const parsedData = JSON.parse(data); // Parse the JSON data
                resolve(parsedData); // Resolve with the parsed data
            } catch (parseError) {
                reject(parseError); // Reject with parse error if JSON parsing fails
            }
        });
    });
};

// API Route to get the data from db.json
app.get('/data', async (req, res) => {
    try {
        const posts = await readDbFile(); // Wait for the db.json to be read
        res.status(200).json(posts); // Send the parsed data as JSON
    } catch (error) {
        console.error('Error reading or parsing db.json:', error);
        res.status(500).json({ error: 'Failed to read or parse data from db.json' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
