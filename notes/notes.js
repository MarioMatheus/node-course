// console.log('Starting notes.js');

const fs = require('fs');


var saveNotes = notes => fs.writeFileSync('notes-data.json', JSON.stringify(notes));

var fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) { 
        return [];
    }
};

 
var addNote = (title, body) => {
    console.log(' * Adding note');
    let notes = fetchNotes();
    let newNote = { title, body };

    let filteredNotes = notes.filter(note => note.title === title);
    if (filteredNotes.length === 0) {
        notes.push(newNote);
        saveNotes(notes);
        return newNote;
    }
};


var getAll = () => {
    console.log(' * Getting all notes');
    return fetchNotes();
};


var getNote = (title) => {
    console.log(' * Getting note');
    let filteredNotes = fetchNotes().filter(note => note.title === title);
    if (filteredNotes.length !== 0) {
        return filteredNotes[0];
    }
};


var removeNote = (title) => {
    console.log(' * Removing note');
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    
    return notes.length !== filteredNotes.length;
}


var logNote = (note) => {
    console.log(' *');
    console.log(' * -Title: ', note.title);
    console.log(' * -Body : ', note.body);
};


module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
