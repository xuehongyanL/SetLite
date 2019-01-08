const {FitFunction}=require('../LinearFunction');
DirectProportionFit=function(stat){
  let Fit=new FitFunction(stat.sumxy,-stat.sqsumx,0);
  alert(Fit.toString());
  return Fit;
};
module.exports.DirectProportionFit=DirectProportionFit;
