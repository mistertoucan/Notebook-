/* Copyright (c) 2017 Anthony Lekan */
var settings = require('./settings.js');
var path = require('path');
var Datastore = require('nedb');

var $ = require('jquery');;

var notebooks = [];

let notebookDB = new Datastore({
    filename: path.join(settings.homePath, 'notebooks.db'),
    timestampData: true,
    autoload: false
});

notebookDB.loadDatabase(function(err) {
    notebookDB.selectAll().forEach(function(notebook) {
       notebooks.append(notebook);
    });
    var found = false;
    notebooks.forEach(function(notebook) {
       if(notebook.name == settings.globalProperties.lastOpened) {
           found = true;
           return;
       }
    });
    if(!found) {
        settings.globalProperties.lastOpened = null;
    }
});

var Notebook = function(name, dateCreated, categories) {
  this.name = name;
  this.dateCreated = dateCreated;
  this.categories = categories;
};

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
    return settings.globalProperties.lastOpened;
}

// Returns a list of all available notebooks names
function getNotebooks() {
    return notebooks;
}


notebookDB.loadDatabase();
module.exports.getNotebooks = getNotebooks;
module.exports.loadNotebook = loadNotebook;
module.exports.getLastNotebook = getLastNotebook;
