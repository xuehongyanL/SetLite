const {FitFunction} = require('../LinearFunction');
function DirectProportionFit(stat){
  let Fit = new FitFunction(stat.sumxy,-stat.sqsumx,0);
  alert(Fit.toString());
  return Fit;
}
module.exports.DirectProportionFit = DirectProportionFit;
