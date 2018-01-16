/* Copyright (c) 2017 Anthony Lekan */
// Mostly boilerplate code

const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600, 'minWidth': 450, 'minHeight': 650});
	win.loadURL(url.format({
    	pathname: path.join(__dirname, './app/notebook.html'),
    	protocol: 'file:',
    	slashes: true
    }));

	win.webContents.openDevTools();

	win.on('closed', () => {
	    win = null;
	    app.exit();
    });
}

app.on('ready', createWindow);
