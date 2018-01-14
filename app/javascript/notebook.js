/* Copyright (c) 2017 Anthony Lekan */
var electron = require('electron');


// Switch from index.html to notebook.html
// & Load new notebook with data
function loadNotebook(notebookID) {

}

// Returns last opened notebook
function getLastNotebook() {
    return null;
}

// Returns a list of all available notebooks names
function getNotebooks() {
    return ['hello', 'my', 'name', 'is', 'jeff'];
}

module.exports.getNotebooks = getNotebooks;
module.exports.loadNotebook = loadNotebook;
module.exports.getLastNotebook = getLastNotebook;
