const {FitFunction} = require('../LinearFunction');
function LinearModelFit(stat){
  let n = stat.cnt;
  let varx = stat.sqsumx / n - (stat.sumx / n) * (stat.sumx / n);
  let A = (stat.sumx * stat.sumy / n - stat.sumxy) / n;
  let B = varx;
  let C = (stat.sumx * stat.sumxy - stat.sumy * stat.sqsumx) / n / n;
  let Fit = new FitFunction(A,B,C);
  alert(Fit.toString());
  return Fit;
}
module.exports.LinearModelFit = LinearModelFit;
