const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Helper function to read data from db.json
function readDbFile() {
  const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');
  const dbData = fs.readFileSync(dbFilePath, 'utf8');
  return JSON.parse(dbData);
}

// Helper function to write data to db.json
function writeDbFile(data) {
  const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.error('Error writing to db.json:', error);
  }
}
  

// GET route to return all saved notes
router.get('/notes', (req, res) => {
  const notes = readDbFile();
  res.json(notes);
});

// POST route to receive a new note, add it to db.json, and return the new note
router.post('/notes', (req, res) => {
  console.log(req.body);
  const notes = readDbFile();
  const newNote = { ...req.body, id: uuidv4() };
  notes.push(newNote);
  writeDbFile(notes);
  res.json(newNote);
});

// DELETE route to delete a note by id
router.delete('/notes/:id', (req, res) => {
  const notes = readDbFile();
  const filteredNotes = notes.filter(note => note.id !== req.params.id);
  writeDbFile(filteredNotes);
  res.json({ message: 'Note has been deleted' });
});

// Export API routes
module.exports = router;