var os = require('os');

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

// default properties
var globalProperties = {
    lastOpenedNotebook: null
};

function readGlobalProperties() {

}

exports.homePath = homePath;