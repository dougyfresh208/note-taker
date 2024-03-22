const path = require('path');
const router = require('express').Router();

// Route to serve the notes.html page when '/notes' is accessed
router.get('/notes', (req, res) => {
    // Correct path with htmlRoutes.js in /routes/ and public at the same level as /routes/
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});

// Catch-all route to serve the index.html page for any other unhandled routes
router.get('*', (req, res) => {
    // Correct path with htmlRoutes.js in /routes/ and public at the same level as /routes/
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Export the router so it can be used by the main server.js file
module.exports = router;