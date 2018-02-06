/* Copyright (c) 2017 Anthony Lekan */
var settings = require('./settings.js');
var path = require('path');
var Datastore = require('nedb');

var $ = require('jquery');

let notebooks;

var Note = function(name, dateCreated, content, noteID) {
    this.name = name;
    this.dateCreated = dateCreated;
    this.content = content;
    this.noteID = noteID;
};

var Notebook = function(name, dateCreated, notes) {
    this.name = name;
    this.dateCreated = dateCreated;
    this.notes = notes;
};

let notebookDB = new Datastore({
    filename: path.join(settings.homePath, 'notebooks.db'),
    timestampData: true,
    autoload: true
});

// Return Codes:
// Notebook Object: Notebook created!
function addNotebook(notebookName) {
    newNotebook = new Notebook(notebookName, new Date(), {});
    notebookDB.insert(newNotebook, function(err, newDoc) {
       newNotebook = newDoc;
    });
    return newNotebook;
}

// Returns notebook object if found
// Returns 404 if not found
function loadNotebook(notebookID, callback) {
    notebookDB.find({_id: notebookID}, function(err, docs) {
        if(docs.length > 0)
            callback(docs[0]);
        callback(404);
    });
}

// Returns a list of all available notebooks names
function getNotebooks() {
    if(notebooks == null) {
        notebooks = notebookDB.getAllData();
    }
    return notebooks;
}

function updateNotebook(notebookID, newNotebook) {
    notebookDB.update({id: notebookID}, newNotebook);
}

module.exports.Note = Note;
module.exports.addNotebook = addNotebook;
module.exports.getNotebooks = getNotebooks;
module.exports.loadNotebook = loadNotebook;
