// console.log('Starting app.js');

// const fs = require('fs');
// const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const argv = yargs
    .command('add', 'Add new note', {
        title: titleOptions,
        body: {
            describe: 'Body of note',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', { title: titleOptions })
    .command('remove', 'Remove a note', { title: titleOptions })
    .help()
    .argv;
var command = argv._[0];
// console.log('Command: ', command);

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log(' * Note added');
        notes.logNote(note);
    } else {
        console.log(' * Note not added, title duplicate');
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    debugger;
    if (allNotes.length > 0) {
        console.log(` * Printing ${allNotes.length} note(s).`);
        allNotes.forEach(note => notes.logNote(note));
    } else {
        console.log(" * Don't exists notes");
    }
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    } else {
        console.log(' * Note not found');
    }
} else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? ` * Note ${argv.title} was removed` : ` * Note ${argv.title} not exists`;
    console.log(message);
} else {
    console.log('Command not recognized');
}
