/* Copyright (c) 2017 Anthony Lekan */
var $ = require('jquery');
var notebook = require('./javascript/notebook.js');


$(document).ready(function() {


});

function addToolBarOptions() {
    for(var i = 12; i <= 36; i+= 2) {
        $('#fontSizeTool').append('<option value=' + i + ">" + i + '</option>');
    }
    $('#fontSizeTool').val(14);
}

function createNote() {

}

function selectNotebook() {
    if(notebook.getLastNotebook() != null) {
        openNotebook(notebook.getLastNotebook());
        return;
    }

    notebook.getNotebooks().forEach(function(name) {
       $('#selectNotebook').append(name);
    });

    $('#selectNotebook').removeClass('hidden');
}

function openNotebook() {

}