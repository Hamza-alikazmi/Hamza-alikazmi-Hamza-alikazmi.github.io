const express = require('express');
const fs = require('fs').promises; // Use the Promise-based fs API
const path = require('path');
const cors = require('cors'); // Add the CORS library
const app = express();
const port = 3000;

// Path to the db.json file
const dbFilePath = path.join(__dirname, 'db.json');

// Enable CORS for all origins
app.use(cors({
  origin: 'https://skillspectum.vercel.app'
}));


// Endpoint to fetch post data from db.json
app.get('/post', async (req, res) => {
    try {
        // Read the db.json file asynchronously
        const data = await fs.readFile(dbFilePath, 'utf8');
        
        // Parse the JSON data
        const posts = JSON.parse(data);

        // Send the data as a JSON response
        res.json(posts);
    } catch (err) {
        console.error('Error reading or parsing db.json:', err);
        res.status(500).json({ error: 'Failed to read or parse data from db.json' });
    }
});

// Serve static files (like HTML, CSS, JS) for the frontend
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
app.get('/course', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'course.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'about.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
