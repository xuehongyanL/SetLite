const {BrowserWindow,Menu,MenuItem,app} = require('electron');
const path = require('path');

function createWindow(){
  let win = new BrowserWindow({
    width: 800, height: 600, title: 'SetLite',
    fullscreenable: false,
    webPreferences: {javascript: true, plugins: true, nodeIntegration: true}
  });
  let menu = new Menu();
  menu.append(new MenuItem({
    label: 'Files',
    submenu: [{label: 'New'},
      {
        label: 'Open', click: function () {
          win.webContents.send('fit', 'load');
        }
      },
      {
        label: 'Save', click: function () {
          win.webContents.send('fit', 'save');
        }
      },
      {type: 'separator'},
      {label: 'Exit', role: 'close'}]
  }));

  Menu.setApplicationMenu(menu);
  win.loadFile(path.resolve(__dirname,'public','index.html'));
  win.webContents.openDevTools();
  win.on('close',()=>{win = null;});
  //win.on('resize',() => {win.reload();})
}

app.on('ready',createWindow);
app.on('window-all-closed',()=>{app.quit();});
