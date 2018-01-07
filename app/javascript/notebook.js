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

function loadNotebook(name) {

}

// Checks if current path exists and loops until newID is found
function getNewID(path) {}
function doesExist(path) {

}



