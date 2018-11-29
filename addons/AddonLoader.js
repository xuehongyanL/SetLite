const path=require('path');
var AddonLoader=function(){
    this.setPath=function(path){
        this.path=path;
    }
    this.load=function(name){
        return require(path.resolve(this.path,name,'index.js'));
    }
}
module.exports.AddonLoader=new AddonLoader();
