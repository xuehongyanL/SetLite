let Basic = function(){
  this.cnt = {init:0,vis:false};
  this.sumx = {init:0,vis:true};
  this.sumy = {init:0,vis:true};
  this.sumxy = {init:0,vis:true};
  this.sqsumx = {init:0,vis:true};
  this.sqsumy = {init:0,vis:true};
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
