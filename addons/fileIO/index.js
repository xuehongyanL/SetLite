const fs = require('fs');
const {dialog} = require('electron').remote;

let write = function(path,data){
  try{
    fs.writeFileSync(path,data);
  }
  catch(err){
    return err;
  }
};
let read = function(path){
  try{
    return fs.readFileSync(path,'utf-8');
  }
  catch(err){
    console.log(err);
  }
};
let save = function(data){
  dialog.showSaveDialog({
    defaultPath:'..',
    filters:[{name:'CSV',extensions:['csv']}]
  },
  function(res){if(res) write(res,data);}
  );
};
let load = function(){
  let path = dialog.showOpenDialog({
    defaultPath:'..',
    properties:['openFile'],
    filters:[{name:'CSV',extensions:['csv']}]
  });
  return path ? read(path[0]) : null;
};

module.exports = {
  save:save,
  load:load
};
