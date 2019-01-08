let Statistics = function(){
  this.dat = {};
  this.handlers = {};
  this.vis = {};
  this.regVar = function(name,dat){
    this.dat[name] = dat.init;
    this.vis[name] = dat.vis || false;
  };
  this.regHandler = function(name,handler){
    this.handlers[name] = {
      doo:handler.doo.bind(this),
      undo:handler.undo.bind(this)
    };
  };
  let config = require('./config');
  for(let pkgName of config.packages){
    let pkg = require('./' + pkgName);
    for(let name of config[pkgName].vars) this.regVar(name,pkg[name]);
    this.regHandler(pkgName,pkg.handler);
  }
  this.doo = function(record){
    for(let name in this.handlers) this.handlers[name].doo(record);
  };
  this.undo = function(record){
    for(let name in this.handlers) this.handlers[name].undo(record);
  };
};
module.exports.Statistics = Statistics;
