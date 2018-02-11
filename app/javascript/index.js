/* Copyright (c) 2017 Anthony Lekan */
var $ = require('jquery');
var notebook = require('./javascript/notebook.js');

let currentNotebook;
var currentNote;

$(document).ready(function() {
    initToolBar();
    selectNotebook();

    rebindListeners();
});

function rebindListeners() {
    $('.note').click(function() {
        console.log("CLICKED!");
        notebook.loadNote($(this).attr('id'), function(note) {
           this.loadNote(note);
        });
        $('.note').removeClass('selected_note');
        $(this).addClass('selected_note');
    });

    $('.list-available-notebook').click(function() {
        $('.list-available-notebook').removeClass('active');
        $(this).toggleClass('active selected-notebook');
    });

}

function noteRenameEvent(event) {
    // Cancels enter
    // && backspace if there is only 1 character left
    if(event.keyCode == 13 || ($('#note_property_title').text().length == 1 && event.keyCode == 8)) {
        event.preventDefault();
    }
    $('#' + currentNote._id).text($('#note_property_title').text());
    currentNote.name = $('#note_property_title').text();
    return false;
}

function noteTypeEvent(event) {
    currentNote.content = $('#noteEditor').html();
    saveNote();
}

function saveNote() {
    if(currentNote != null) {
        currentNote.name = $('#note_property_title').text();
        currentNote.content = $('#noteEditor').html();
        notebook.updateNote(currentNote);
        currentNote.updatedAt = new Date();
        $('#note_property_LastEdited').text(currentNote.updatedAt);
    }
}

function createNotebook() {
    var notebookID = null;
    var notebookName = null;
    if($('.selected-notebook').text()) {
        notebookID = $('.selected-notebook').attr('id');
    } else if($('#newNotebookInputName').val()) {
        notebookName = $('#newNotebookInputName').val();
    }
    // Create new notebook if name isn't null
    // Load notebook if ID isn't null
    if(notebookName != null || notebookID != null) {
        hideNotebookSelection();
        if(notebookName) {
            notebook.addNotebook(notebookName, loadNotebook);
        } else {
            notebook.loadNotebook(notebookID, loadNotebook);
        }

    }
}

// Callback function which loads notebook after finding object in DB
function loadNotebook(notebook) {
    currentNotebook = notebook;
    loadNotebookUI(notebook);
}

function loadNotebookUI() {
    $('#notebookName').text(currentNotebook.name);
    $('#createNotebook').hide();
    $('#noNoteMessage').show();
    loadSidebar();
}

function loadSidebar() {
    // Sort the notes by their date of creation
    notebook.getNotes(currentNotebook._id, function(notes) {
        // Loop through each note and add it to the sidebar
        notes.forEach(function(note) {
            $('#files').append("<li class='note' id='" + note._id+ "'>" + note.name + "</li>")
        });
        rebindListeners();
    });
}

function createNote() {
    if(currentNotebook) {
        notebook.createNote(new notebook.Note(currentNotebook._id, 'New Note', ''), function(note) {
            currentNote = note;
            loadNote(note);
            $('#files').append("<li class='note selected_note' id='" + note._id+ "'>" + note.name + "</li>");
        });
    }
}

function loadNote(note) {
    $('#emptyNote').hide();
    $('#note').show();
    $('#note_property_title').text(note.name);
    $('#note_property_DateCreated').text(note.createdAt);
    $('#note_property_LastEdited').text(note.updatedAt);
    $('#noteEditor').html(note.content);

    $('.note').removeClass('selected_note');
    $('#' + note._id).addClass('selected_note');
    currentNote = note;
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

    notebook.getNotebooks(function(notebooks) {
        notebooks.forEach(function(notebook) {
            console.log(notebook);
            $('#availableNotebooks').prepend('<li id="' + notebook._id + '" class="list-group-item list-available-notebook">' + notebook.name + '</li>');
        });
        rebindListeners();
    });

}


