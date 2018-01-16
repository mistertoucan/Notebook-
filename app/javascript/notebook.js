/* Copyright (c) 2017 Anthony Lekan */
var settings = require('./settings.js');
var path = require('path');
var Datastore = require('nedb');

var $ = require('jquery');;

let notebooks = new Datastore({
    filename: path.join(settings.homePath, 'notebooks.db'),
    timestampData: true,
    autoload: true
});

var notebook = function(name, dateCreated, categories, notes) {
  return {};
};

function addNotebook(notebook) {

}

function loadNotebook(notebook) {
    if(!$.inArray(notebook, getNotebooks())) {
        return 200;
    }
    return 'A notebook with this name already exists!';
}

// Returns last opened notebook
function getLastNotebook() {
    return null;
}

// Returns a list of all available notebooks names
function getNotebooks() {
    return [];
}

module.exports.getNotebooks = getNotebooks;
module.exports.loadNotebook = loadNotebook;
module.exports.getLastNotebook = getLastNotebook;
