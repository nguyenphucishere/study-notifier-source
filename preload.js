const electron = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const showCurrent = document.querySelector('#show-current')
  const showNext = document.querySelector('#show-next')
  //const electron = ;
  const path = require('path')

  showCurrent.addEventListener('click', () => {
    const { remote } = electron
    console.log(remote)
    /*const BrowserWindow = remote.BrowserWindow
    const win = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        preload: path.join(__dirname, 'loadCurrentSubject.js')
      }
    });

    win.loadFile('notificationSubject.html')*/
  });

});
