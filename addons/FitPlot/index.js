const {newPlot} = require('./plotly.min.js');

function FitPlot(pts, fit, id) {
  let dat;
  if (!pts.length) dat = [];
  else {
    pts.columns = ['x', 'y'];
    let [xs, ys] = [pts.get('x'), pts.get('y')];
    let dat1 = {x: xs, y: ys, name: 'Points', mode: 'markers'};
    let func = fit ? fit.toFunction() : null;
    if (!func) dat = [dat1];
    else {
      let maxx = Math.max.apply(null, xs), minx = Math.min.apply(null, xs);
      let left = minx - Math.max(1, 0.2 * (maxx - minx)), right = maxx + Math.max(1, 0.2 * (maxx - minx));
      let step = (right - left) / 200;
      let xRange = Array(200).fill(0).map((v, i) => i * step + left);
      let yRange = xRange.map((value) => (func(value)));
      let dat2 = {x: xRange, y: yRange, name: 'Fit', mode: 'lines'};
      dat = [dat1, dat2];
    }
  }
  newPlot($('#' + id)[0], dat, {title: (fit ? fit.toString() : null)}, {displaylogo: false});
}

module.exports.FitPlot = FitPlot;
