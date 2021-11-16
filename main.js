const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

app.commandLine.appendSwitch('widevine-cdm-path', 
'C:\\Program Files (x86)\\Google\\Chrome\\Application\\95.0.4638.69\\WidevineCdm\\_platform_specific\\win_x64\\widevinecdm.dll')
app.commandLine.appendSwitch('widevine-cdm-version', '4.10.2391.0')


function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: true,
      allowRunningInsecureContent: true
    },
    icon: __dirname + '/src/imgs/ico.jpg',
  })

  mainWindow.loadFile('src/pages/index.html')
  mainWindow.removeMenu()


  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on("new-window", function(event, url) {
    event.preventDefault();
    shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

