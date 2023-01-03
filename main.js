const {app, BrowserWindow} = require('electron')

const server = require('./app'); //ADD THIS

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1270,
    height: 720,
    // fix the window size
    resizable: false,
    // disable the default menu bar
    autoHideMenuBar: true,
    icon: __dirname + '/icons/youtube.ico',
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    }
  })

  mainWindow.loadURL('http://localhost:3000')  //ADD THIS
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('resize', function(e,x,y){
  mainWindow.setSize(x, y);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})