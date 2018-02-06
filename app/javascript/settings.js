var os = require('os');
var path = require('path');
var Datastore = require('nedb');

let homePath =  os.homedir();
const platform = os.platform();

var SessionProperties = function(fontSize, fontFamily, lineSpacing) {
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.lineSpacing = lineSpacing;
};

var defaultProperties = new SessionProperties(null, 14, 'Courier', 2);

// Finds notebook homePath based on platform
if(platform == 'darwin') {
    homePath += "/Library/Application Support/Notebook+";
} else if(platform == 'win32') {
    homePath += "/AppData/Local/Notebook+/";
    console.log(homePath);
} else {
    console.log('This system is not yet supported!');
    process.exit(-1);
}

let sessionDB = new Datastore({
        filename: path.join(homePath, 'session.db'),
        timestampData: true
});

console.log(path.join(homePath, 'session.db'));

// Loads session data from last open
sessionDB.loadDatabase(function() {
    if (sessionDB.getAllData().length == 0) {
        sessionDB.insert(defaultProperties);
    }
    sessionDB.find({}, function(docs, err) {
        console.log(docs);
    });
});

function updateProperties() {
    sessionDB.remove(0);
    sessionDB.insert(exports.globalProperties);
}

exports.homePath = homePath;
exports.globalProperties = sessionDB.getAllData()[0];
exports.updateProperties = updateProperties;