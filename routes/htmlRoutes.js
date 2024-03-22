// routes/htmlRoutes.js
const path = require('path');

module.exports = function(app) {
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    // This route should be the last defined to act as a catch-all for any request not handled by your other routes.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};