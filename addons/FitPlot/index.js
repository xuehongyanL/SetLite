import { VictoryChart,VictoryTheme,VictoryScatter,VictoryLine} from 'victory';
import React, { Component } from 'react';
import { render } from 'react-dom';

class Chart extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <VictoryChart
        theme={VictoryTheme.material}
        domain={this.props.domain}
        width={800}
        height={600}>
        <VictoryScatter
          style={{data:{fill:'#c43a31'}}}
          size={4}
          data={this.props.scatterData}
        />
        <VictoryLine
          style={{
            data:{stroke:'#c43a31'},
            parent:{border:'1px solid #ccc'}
          }}
          data={this.props.lineData}
        />
      </VictoryChart>);
  }
}

class FitPlot extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let pts = this.props.pts;
    let fit = this.props.fit;
    let dat,maxx,minx,maxy,miny;
    if (!pts.length){
      maxx = 1;
      maxy = 1;
      minx = -1;
      miny = -1;
      dat = [null,null];
    }
    else{
      let dat1 = pts;
      let xs = pts.map((value) => (value['x']));
      maxx = Math.max.apply(null, xs);
      minx = Math.min.apply(null, xs);
      let deltax = maxx - minx;
      maxx += Math.max(1, 0.2 * deltax);
      minx -= Math.max(1, 0.2 * deltax);
      let ys = pts.map((value) => (value['y']));
      maxy = Math.max.apply(null, ys);
      miny = Math.min.apply(null, ys);
      let deltay = maxy - miny;
      maxy += Math.max(1, 0.2 * deltay);
      miny -= Math.max(1, 0.2 * deltay);
      let func = fit ? fit.toFunction() : null;
      if (!func){
        dat = [dat1,null];
      }
      else {
        let step = (maxx - minx) / 200;
        let xRange = Array(200).fill(0).map((v, i) => i * step + minx);
        let dat2 = xRange.map((value) => ({x:value,y:func(value)}));
        dat = [dat1, dat2];
      }
    }
    let domain = {x:[minx,maxx],y:[miny,maxy]};
    // console.log(dat);
    return (<Chart scatterData={dat[0]} lineData={dat[1]} domain={domain} />);
  }
}

export {FitPlot};
