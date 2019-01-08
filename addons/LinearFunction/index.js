let FitFunction = function(A,B,C){//A x+ B y+ C==0
  this.mode = 'Linear';
  this.A = A;
  this.B = B;
  this.C = C;
  this.toString = function(){
    if(!(this.A * this.A + this.B * this.B) || (this.C === undefined)) return 'Invalid function';
    if(!this.B) return 'x= ' + (-this.C / this.A).toFixed(4);
    return 'y= ' + (-this.C / this.B).toFixed(4) + ' + ' + (-this.A / this.B).toFixed(4) + ' x';
  };
  this.toFunction = function(){
    if(this.A * this.A + this.B * this.B && (this.C || this.C === 0)){
      return (x)=>((-this.A / this.B) * x + (-this.C / this.B));
    }
  };
};
module.exports.FitFunction = FitFunction;
