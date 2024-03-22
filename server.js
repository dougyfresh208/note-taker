const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Import routes with corrected paths
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Use routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});