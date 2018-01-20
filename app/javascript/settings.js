var os = require('os');
var path = require('path');
var Datastore = require('nedb');

let homePath =  os.homedir();
const platform = os.platform();

// Finds notebook homePath based on platform
if(platform == 'darwin') {
    homePath += "/Library/Application Support/Notebook+";
} else if(platform == 'win32') {
    homePath += "/AppData/Local/Notebook+/";
} else {
    console.log('This system is not yet supported!');
    process.exit(-1);
}

let sessionDB = new Datastore({
        filename: path.join(homePath, 'session.db'),
        timestampData: true,
        autoload: true
});

// Loads sessiond data from last open
if(sessionDB.getAllData().length == 0) {
    sessionDB.insert(defaultProperties);
}


var SessionProperties = function(lastOpenedNotebook, fontSize, fontFamily, lineSpacing) {
    this.lastOpened = lastOpenedNotebook;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.lineSpacing = lineSpacing;
};

var defaultProperties = new SessionProperties(null, 14, 'Courier', 2);

function updateProperties() {
    sessionDB.remove(0);
    sessionDB.insert(exports.globalProperties);
}

exports.homePath = homePath;
exports.globalProperties = sessionDB.getAllData()[0];
exports.updateProperties = updateProperties;