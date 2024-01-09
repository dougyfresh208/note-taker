// Your JavaScript logic for handling notes will go here
document.addEventListener('DOMContentLoaded', () => {
    const newNoteBtn = document.getElementById('new-note');
    const saveNoteBtn = document.getElementById('save-note');
    const clearFormBtn = document.getElementById('clear-form');
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
  
    // Function to fetch notes from the server
    const fetchNotes = async () => {
      const response = await fetch('/api/notes');
      const notes = await response.json();
      renderNotes(notes);
    };
  
    // Function to render notes in the left column
    const renderNotes = (notes) => {
      leftColumn.innerHTML = '';
      notes.forEach((note) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `<p>${note.title}</p>`;
        noteItem.addEventListener('click', () => displayNoteDetails(note));
        leftColumn.appendChild(noteItem);
      });
    };
  
    // Function to display note details in the right column
    const displayNoteDetails = (note) => {
      rightColumn.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.text}</p>
      `;
      newNoteBtn.style.display = 'block';
    };
  
    // Event listener for the New Note button
    newNoteBtn.addEventListener('click', () => {
      rightColumn.innerHTML = '<input id="note-title" placeholder="Note Title"><textarea id="note-text" placeholder="Note Text"></textarea>';
      saveNoteBtn.style.display = 'block';
      clearFormBtn.style.display = 'block';
      newNoteBtn.style.display = 'none';
    });
  
    // Event listener for the Save Note button
    saveNoteBtn.addEventListener('click', async () => {
      const noteTitle = document.getElementById('note-title').value;
      const noteText = document.getElementById('note-text').value;
  
      if (noteTitle && noteText) {
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: noteTitle, text: noteText }),
        });
  
        const newNote = await response.json();
        fetchNotes();
        clearForm();
      }
    });
  
    // Event listener for the Clear Form button
    clearFormBtn.addEventListener('click', clearForm);
  
    // Function to clear the form fields
    const clearForm = () => {
      document.getElementById('note-title').value = '';
      document.getElementById('note-text').value = '';
      saveNoteBtn.style.display = 'none';
      clearFormBtn.style.display = 'none';
      newNoteBtn.style.display = 'block';
    };
  
    // Fetch initial notes on page load
    fetchNotes();
  });
  