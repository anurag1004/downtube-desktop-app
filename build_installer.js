const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './ytd-win32-x64');
const OUT_DIR = path.resolve(__dirname, './windows_installer');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'Downtube.live',
    exe: 'ytd',
    name: 'downtube',
    manufacturer: 'AxDu',
    version: '1.0.0',
    icon:'./icons/youtube.ico',

    // Configure installer User Interface
    ui: {
        chooseDirectory: true
    },
});

msiCreator.create().then(function(){

    msiCreator.compile();
});