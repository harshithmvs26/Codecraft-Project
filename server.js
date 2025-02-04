const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// Save code to a file
app.post('/save', (req, res) => {
    const { filename, code } = req.body;
    fs.writeFile(path.join(__dirname, 'saved', filename), code, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving file' });
        }
        res.json({ message: 'File saved successfully' });
    });
});

// Load code from a file
app.get('/load/:filename', (req, res) => {
    const { filename } = req.params;
    fs.readFile(path.join(__dirname, 'saved', filename), 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json({ code: data });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});