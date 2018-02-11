/* Copyright (c) 2017 Anthony Lekan */
var settings = require('./settings.js');
var path = require('path');
var Datastore = require('nedb');

var Notebook = function(name) {
    this.name = name;
};
var Note = function(notebookID, name, content) {
    this.notebookID = notebookID;
    this.name = name;
    this.content = content;
};

// Save notebooks themselves here
let notebookDB = new Datastore({
    filename: path.join(settings.homePath, 'notebooks.db'),
    timestampData: true,
    autoload: true
});

// Save note objects associated to notebooks here
let notesDB = new Datastore({
    filename: path.join(settings.homePath, 'notes.db'),
    timestampData: true,
    autoload: true
});

// Creates a new notebook object & returns it
function addNotebook(notebookName, callback) {
    newNotebook = new Notebook(notebookName);
    notebookDB.insert(newNotebook, function(err, newDoc) {
        callback(newDoc);
    });
}

// Returns notebook object if found
// Returns 404 if not found
function loadNotebook(notebookID, callback) {
    if(notebookDB.find({_id: notebookID}).limit(1).exec(function(err, docs) {
        callback(docs[0]);
    }));
}

// Returns all available notebooks
function getNotebooks(callback) {
    notebookDB.find({}, function(err, docs) {
       callback(docs);
    });
}

// Attempts to find all available notes for a notebook
function getNotes(notebookID, callback) {
    notesDB.find({notebookID: notebookID}).sort({updatedAt: 1}).exec(function(err, docs) {
        console.log(docs);
        callback(docs);
    });
}

function updateNote(note) {
    notesDB.update({_id: note._id}, {name: note.name, content: note.content}, {}, function(err, numReplaced) {});
}

function loadNote(noteID, callback) {
    notesDB.find({_id: noteID}).limit(1).exec(function(err, docs) {
        callback(docs[0]);
    });
}

function createNote(note, callback) {
    notesDB.insert(note, function(err, newDoc) {
        callback(newDoc);
    });
}

function updateNotebook(notebookID, newNotebook, callback) {
    notebookDB.update({_id: notebookID}, newNotebook, {}, function(err, numReplaced) {
       callback(newNotebook);
    });
}

module.exports.Note = Note;
module.exports.addNotebook = addNotebook;
module.exports.getNotebooks = getNotebooks;
module.exports.loadNotebook = loadNotebook;
module.exports.getNotes = getNotes;
module.exports.updateNote = updateNote;
module.exports.loadNote = loadNote;
module.exports.createNote = createNote;
module.exports.updateNotebook = updateNotebook;
