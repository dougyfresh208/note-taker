const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});