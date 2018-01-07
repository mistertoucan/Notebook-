/* Copyright (c) 2017 Anthony Lekan */
// Mostly boilerplate code

const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600});
	win.loadURL(url.format({
    	pathname: path.join(__dirname, './app/index.html'),
    	protocol: 'file:',
    	slashes: true
    }));

	require('./app/javascript/menu.js')
}

app.on('ready', createWindow);

app.on('closed', function() {
	win = null;
	app.exit();
});