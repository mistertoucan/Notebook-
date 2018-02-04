/* Copyright (c) 2017 Anthony Lekan */
var settings = require('./settings.js');
var path = require('path');
var Datastore = require('nedb');

var $ = require('jquery');

var notebooks = [];

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

function init() {
    notebooks = notebookDB.getAllData();
    var found = false;
    notebooks.forEach(function (notebook) {
        if (notebook.name == settings.globalProperties['lastOpened']) {
            found = true;
            return;
        }
    });
    if (!found) {
        if (settings.globalProperties != null) {
            settings.globalProperties['lastOpened'] = null;
        }
    }
}
init();

// Return Codes:
// 200: All good created!
// 300: Notebook With Name Already Exists
// 400: Db Problem
function addNotebook(notebookName) {
    if(notebookDB.find({name: notebookName}, function(err, docs) {
        if(docs.length > 0) {
            return 300;
        }
    }));
    newNotebook = new Notebook(notebookName, new Date(), {});
    notebookDB.insert(newNotebook);
    return newNotebook;
}

// Returns notebook object if found
// Returns 404 if not found
function loadNotebook(notebookName) {
    if(notebookDB.find({name: notebookName}, function(err, docs) {
        if(docs.length > 0) {
            return docs[0];
        }
    }));
    return 404;
}

// Returns last opened notebook
function getLastNotebook() {
    if(settings.globalProperties != null) {
        return settings.globalProperties['lastOpened'];
    }
    return null;
}

// Returns a list of all available notebooks names
function getNotebooks() {
    if(notebookDB == null) {
        notebookDB.loadDatabase();
    }
    notebookDB.getAllData();
}

function updateNotebook(notebookID, newNotebook) {
    notebookDB.update({id: notebookID}, newNotebook);
}

module.exports.Note = Note;
module.exports.addNotebook = addNotebook;
module.exports.getNotebooks = getNotebooks;
module.exports.loadNotebook = loadNotebook;
module.exports.getLastNotebook = getLastNotebook;
