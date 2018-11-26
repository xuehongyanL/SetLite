const electron=require('electron');
const BrowserWindow=electron.BrowserWindow;
const Menu=electron.Menu;
const MenuItem=electron.MenuItem;
const app=electron.app;
const path=require("path");
const {ipcMain}=require('electron');

let win;
function createWindow(){
    win=new BrowserWindow({
        width:800,height:600,
        fullscreenable:false,
        webPreferences:{javascript:true,plugins:true}
    });
    menu=new Menu();
    menu.append(new MenuItem({
        label:'undo',
        click:function(){win.webContents.send('fit','undo');},
        accelerator: 'CmdOrCtrl+Z'
    }));
    menu.append(new MenuItem({
        label:'addpt',
        click:function(){win.webContents.send('fit','addpt');},
        accelerator: 'Enter'
    }));
    Menu.setApplicationMenu(menu);
    win.loadFile(path.resolve(__dirname,'public','index.html'));
    // win.webContents.openDevTools();
    win.on('close',() => {win = null;});
    //win.on('resize',() => {win.reload();})
}

app.on('ready',createWindow);
app.on('window-all-closed',()=>{app.quit();});
app.on('activate',()=>{if(win==null) createWindow();})
