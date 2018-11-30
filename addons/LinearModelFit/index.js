LinearModelFit=(stat)=>{
  let n=stat.cnt;
  if(n<2){alert('Exception: not enough points');return;}
  let varx=stat.sqsumx/n-(stat.sumx/n)*(stat.sumx/n);
  if(!varx){alert('x= '+stat.sumx/n.toFixed(4));return;}
  let a=-(stat.sumx*stat.sumxy-stat.sumy*stat.sqsumx)/varx/n/n;
  let b=-(stat.sumx*stat.sumy/n/n-stat.sumxy/n)/varx;
  alert('y= '+a.toFixed(4)+'+ '+b.toFixed(4)+' x');
  return (x)=>(a+b*x);
}
module.exports.LinearModelFit=LinearModelFit;
