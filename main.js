const {BrowserWindow,Menu,MenuItem,app,ipcMain}=require('electron');
const path=require("path");

let win;
function createWindow(){
    win=new BrowserWindow({
        width:800,height:600,
        fullscreenable:false,
        webPreferences:{javascript:true,plugins:true}
    });
    menu=new Menu();
    menu.append(new MenuItem({
        label:'Files',
        submenu:[{label:'New'},
        {label:'Save'},
        {type:'separator'},
        {label:'Exit',role:'close'}]
    }));
    menu.append(new MenuItem({
        label:'Edit',
        submenu:[{label:'Add',click:function(){win.webContents.send('fit','addpt');}},
        {label:'Undo',click:function(){win.webContents.send('fit','undo');}}]
    }));
    Menu.setApplicationMenu(menu);
    win.loadFile(path.resolve(__dirname,'public','index.html'));
    win.webContents.openDevTools();
    win.on('close',()=>{win=null;});
    //win.on('resize',() => {win.reload();})
}

app.on('ready',createWindow);
app.on('window-all-closed',()=>{app.quit();});
app.on('activate',()=>{if(win==null) createWindow();})
