/* Copyright (c) 2017 Anthony Lekan */
var $ = require('jquery');
var notebook = require('./javascript/notebook.js');

$(document).ready(function() {
    if(notebook.getLastNotebook() == null) {
        selectNotebook();
    }
});

function createNotebook() {
    $('#createNotebookName').removeClass('warning');
    if(!$('#createNotebookName').val()) {
        console.log($('#createNotebookName').val());
        $('#createNotebookName').addClass('warning');
        return;
    }
    var result = notebook.loadNotebook($('#createNotebookName').val());
    if(result != 200) {
        $('#invalidNameError').remove();
        $('#createFormWrapper').prepend('<h3 id="invalidNameError" style="color: red;">' + result + '</h3>');
    } else {
        console.log("HELLO!");
    }

}

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
    $('#selectNotebook').removeClass('hidden');
    $('#note').hide();
    if(notebook.getNotebooks().length == 0) {
        $('#createNotebook').removeClass('hidden');
    } else {
        notebook.getNotebooks().forEach(function(name) {
           $('#selectNotebook').append(name);
        });


    }
}

function openNotebook() {

}