let Basic = function(){
  this.cnt = {name:'n',init:0,vis:false};
  this.sumx = {name:'\\sum{\\overline{x}}',init:0,vis:true};
  this.sumy = {name:'\\sum{\\overline{y}}',init:0,vis:true};
  this.sumxy = {name:'\\sum{\\overline{xy}}',init:0,vis:true};
  this.sqsumx = {name:'\\sum{\\overline{x^2}}',init:0,vis:true};
  this.sqsumy = {name:'\\sum{\\overline{y^2}}',init:0,vis:true};
  this.handler = {doo:function(record){
    let x = record.x,y = record.y;
    this.dat.cnt++;
    this.dat.sumx += x;
    this.dat.sumy += y;
    this.dat.sumxy += x * y;
    this.dat.sqsumx += x * x;
    this.dat.sqsumy += y * y;
  },undo:function(record){
    let x = record.x,y = record.y;
    this.dat.cnt--;
    this.dat.sumx -= x;
    this.dat.sumy -= y;
    this.dat.sumxy -= x * y;
    this.dat.sqsumx -= x * x;
    this.dat.sqsumy -= y * y;
  }
  };
};
module.exports = new Basic();
