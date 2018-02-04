/* Copyright (c) 2017 Anthony Lekan */
var $ = require('jquery');
var notebook = require('./javascript/notebook.js');

let noteIDCount = 1;
var currentNotebook;
var currentNote;

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

    $('.note').click(function() {
        clickedNote = null;
        currentNotebook.notes.forEach(function(note) {
            if($(this).id == note.dateCreated) {
                clickedNote = note;
            }
        });
        loadNote(clickedNote)
    });
}

function noteRenameEvent(event) {
    // Cancels enter
    // && backspace if there is only 1 character left
    if(event.keyCode == 13 || ($('#note_property_title').text().length == 1 && event.keyCode == 8)) {
        event.preventDefault();
    }
    $('#' + currentNote.noteID).text($('#note_property_title').text());
    currentNote.name = $('#' + currentNote.noteID).text();
    return false;
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
    currentNotebook = notebook;
    $('#notebookName').text(notebook.name);
    $('#createNotebook').hide();
    $('#noNoteMessage').show();
    loadSidebar(notebook);
}

function loadSidebar(notebook) {
    orderedDates = currentNotebook.notes.keys;
    orderedDates.forEach(function(date) {
        var note = notebook.notes[date];
        if(currentNote.noteID >= noteIDCount) {
            noteIDCount = currentNote.noteID + 1;
        }
        $('#files').append("<li class='note' id='" + note.noteID + "'>" + note.name + "</li>")
    });
}

function createNote() {
    if(currentNotebook) {
        var creationDate = new Date();
        $('#files').append("<li class='noteCategory' id='" + noteIDCount + "'>Note #" + noteIDCount +"</li>")
        var note = new notebook.Note("Note #" + noteIDCount, creationDate, 'Hello World!', noteIDCount);
        noteIDCount += 1;
        currentNote = note;
        loadNote(note);
    }
}

function loadNote(note) {
    $('#emptyNote').hide();
    $('#note').show();
    $('#note_property_title').text(note.name);
    $('#note_property_DateCreated').text(note.dateCreated);
    $('#noteEditor').html(note.content);

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