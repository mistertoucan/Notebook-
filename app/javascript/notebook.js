/* Copyright (c) 2017 Anthony Lekan */
var electron = require('electron');
var fs = require('fs');

var os = require('os');

let homePath =  os.homedir();
const platform = os.platform();

if(platform == 'darwin') {
  homePath += "/Library/Application Support/Notebook+"
}  else {
    console.log("This system is not supported!");
    process.exit(-1);
}





