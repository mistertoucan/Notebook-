/* Copyright (c) 2017 Anthony Lekan */
var $ = require('jquery');
var notebook = require('./javascript/notebook.js');

$(document).ready(function() {
    initToolBar();
    selectNotebook();

    addEventListeners();
});

function addEventListeners() {
    $('.list-available-notebook').click(function() {

       $(this).toggleClass('active selected-notebook');
    });

    $('#page').click(function() {
       console.log('Hello1');
    });
}

function createNotebook() {
    var notebookName = null;
    if($('.selected-notebook').text()) {
        notebookName = $('.selected-notebook').text();
    } else if($('#newNotebookInputName').val()) {
        notebookName = $('#newNotebookInputName').val();
    }
    if(notebookName != null) {
        hideNotebookSelection();
        var result = notebook.loadNotebook(notebookName);
        // If notebook not found load new notebook
        if (result == 404) {
            var nb = notebook.addNotebook(notebookName);
            loadNotebookUI(nb);
        } else {
            loadNotebookUI(result);
        }
    }
}

function loadNotebookUI(notebook) {
    $('#notebookName').text(notebook.name);
    $('#createNotebook').hide();
    $('#noNoteMessage').show();
    loadSidebar(notebook);
}

function loadSidebar(notebook) {
    console.log(notebook);
    for(key in notebook.categories) {
        $('#files').append('<li>' + key);
    }
    $('#noteSidebar').append('<li><button action="createCategory()" class="noteCategory btn-primary btn-lg">+</button></li>');
}

function initToolBar() {
    for(var i = 12; i <= 36; i+= 2) {
        $('#fontSizeTool').append('<option value=' + i + ">" + i + '</option>');
    }
    $('#fontSizeTool').val(14);
}

function hideNotebookSelection() {
    $('#selectNotebook').hide();
    $('#emptyNote').show();
}

function selectNotebook() {
    $('#emptyNote').hide();
    $('#note').hide();
    if(notebook.getLastNotebook() != null) {
        openNotebook(notebook.getLastNotebook());
        return;
    }

    notebook.getNotebooks().forEach(function(notebook) {
       $('#availableNotebooks').prepend('<li class="list-group-item list-available-notebook">' + notebook.name + '</li>');
    });

}

function openNotebook() {

}