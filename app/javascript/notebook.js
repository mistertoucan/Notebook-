/* Copyright (c) 2017 Anthony Lekan */
var electron = require('electron');
var fs = require('fs');
var { homePath } = require('settings.js');

var properties = function(id, isOpened, name, text) {
    this.id = id;
    this.isOpened = isOpened;
    this.name = name;
    this.text = text;
};

// Switch from index.html to notebook.html
// & Load new notebook with data
function loadNotebook(name) {

}

// Returns a list of all available notebooks
function getNotebooks() {}





