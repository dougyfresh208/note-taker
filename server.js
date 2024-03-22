const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Placeholder for routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Implementing DELETE request
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
  
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      const updatedNotes = notes.filter(note => note.id !== noteId);
  
      fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(updatedNotes, null, 2), err => {
        if (err) throw err;
        res.json({ message: 'Deleted note' });
      });
    });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});