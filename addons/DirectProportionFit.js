function DirectProportionFit(stat,n){
  if(n<1){
    alert('Exception: not enough points');
    return;
  }
  if(!stat.sqsumx){
    alert('Exception: all points at origin');
    return;
  }
  let k=stat.sumxy/stat.sqsumx;
  alert('y= '+k.toFixed(4)+' x');
  return (x)=>(k*x);
}
module.exports.DirectProportionFit=DirectProportionFit;
