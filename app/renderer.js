const path=require('path');

const {Col,Panel,Button,ButtonGroup,ListGroup,ListGroupItem,FormGroup,FormControl,InputGroup}=ReactBootstrap;
const {FitPlot}=require(path.resolve(__dirname,'..','addons','FitPlot'));
const {LinearModelFit}=require(path.resolve(__dirname,'..','addons','LinearModelFit'));
const {DirectProportionFit}=require(path.resolve(__dirname,'..','addons','DirectProportionFit'));
const {DataFrame}=require(path.resolve(__dirname,'..','addons','DataFrame'));

class Input extends React.Component{
  render(){
    return(
      <FormGroup id={this.props.id+'input'} validationState={this.props.mode}>
        <InputGroup bsSize="large">
          <InputGroup.Addon>{this.props.name}</InputGroup.Addon>
          <FormControl type="text" id={this.props.id}
            placeholder={"your "+this.props.name+" here"} value={this.props.value||''}
            onChange={this.props.onChange}/>
        </InputGroup>
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}

class Fit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cnt:0,nowxVal:NaN,nowyVal:NaN,
      nowxMode:'warning',nowyMode:'warning',
    };
    this.stat={
      pts:new DataFrame(['x','y']),
      sumx:0,sumy:0,sumxy:0,
      sqsumx:0,sqsumy:0,
    };
    this.xianxingFit=()=>{
      FitPlot(this.stat.pts,LinearModelFit(this.stat,this.state.cnt),'plot');
      $("#collapseOne").collapse('show');
    };
    this.zhengbiliFit=()=>{
      FitPlot(this.stat.pts,DirectProportionFit(this.stat,this.state.cnt),'plot');
      $("#collapseOne").collapse('show');
    };
  }
  componentDidMount(){this.props.onRef(this);}
  handlerChange(event){
    let newVal=event.target.value;
    newVal=(newVal.match(/^\s+$/)||newVal=='')?NaN:newVal;
    let id=event.target.id;
    this.setState({
      [id+'Val']:newVal,
      [id+'Mode']:(Number(newVal)||newVal==0)?'success':'error'
    });
  }
  add_pt(){
    const [x,y]=[Number(this.state.nowxVal),Number(this.state.nowyVal)];
    if(!x) this.setState({nowxMode:'error',validVal:false});
    if(!y) this.setState({nowyMode:'error',validVal:false});
    if((!x&&x!=0)||(!y&&y!=0)){alert('invalid value');return;}
    let stat=this.stat;
    stat.pts.add({'x':x,'y':y});
    stat.sumx+=x;
    stat.sumy+=y;
    stat.sumxy+=x*y;
    stat.sqsumx+=x*x;
    stat.sqsumy+=y*y;
    this.setState({
      cnt: this.state.cnt+1,
      nowxVal: NaN,nowyVal: NaN,
      nowxMode: 'warning',nowyMode: 'warning'
    });
  }
  rm_pt(id){
    var stat=this.stat;
    let pt=stat.pts.loc(id);
    stat.pts.drop(id);
    stat.sumx-=pt.x;
    stat.sumy-=pt.y;
    stat.sumxy-=pt.x*pt.y;
    stat.sqsumx-=pt.x*pt.x;
    stat.sqsumy-=pt.y*pt.y;
    this.setState({cnt: this.state.cnt-1});
  }
  render(){
    var self=this;
    var stat=this.stat;
    var res=stat.pts.to_record().map(function(pt,move){
      return(
        <ListGroupItem key={move}>
          <button onClick={()=>{self.rm_pt(move);}}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          &nbsp;&nbsp;&nbsp;({pt.x},{pt.y})
        </ListGroupItem>);
    });
    return(
      <div>
        <Col id="upContainer" sm={12} lg={8}>
          <Input id="nowx" name="x" mode={this.state.nowxMode}
            value={this.state.nowxVal} onChange={this.handlerChange.bind(this)} />
          <Input id="nowy" name="y" mode={this.state.nowyMode}
            value={this.state.nowyVal} onChange={this.handlerChange.bind(this)} />
        </Col>
        <Col id="middleContainer" sm={12} lg={8}>
          <Panel bsStyle="default">
            <Panel.Heading><Panel.Title toggle>Plot</Panel.Title></Panel.Heading>
            <Panel.Collapse id="collapseOne">
              <Panel.Body sm={12}><div id="plot"></div></Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Col>
        <Col id="downContainer" sm={12} lg={8}>
          <Col id="leftContainer" sm={6}>
            <ButtonGroup>
              <Button bsStyle="default" onClick={this.add_pt.bind(this)}>ADD POINT</Button>
              <Button bsStyle="default" onClick={this.xianxingFit.bind(this)}>线性回归</Button>
              <Button bsStyle="default" onClick={this.zhengbiliFit.bind(this)}>正比例回归</Button>
            </ButtonGroup>
            <ListGroup>{res}</ListGroup>
          </Col>
          <Col id="rightContainer" sm={6}>
            <Panel bsStyle="info">
              <Panel.Heading><Panel.Title>Statistics</Panel.Title></Panel.Heading>
              <Panel.Body>
                <ul>sumx: {stat.sumx.toFixed(4)}</ul>
                <ul>sumy: {stat.sumy.toFixed(4)}</ul>
                <ul>sumxy: {stat.sumxy.toFixed(4)}</ul>
                <ul>sqsumx: {stat.sqsumx.toFixed(4)}</ul>
                <ul>sqsumy: {stat.sqsumy.toFixed(4)}</ul>
              </Panel.Body>
            </Panel>
          </Col>
        </Col>
      </div>);
  }
}

class LinearFit extends React.Component{
    constructor(props){
      super();
      const self=this;
      const ipcRenderer = require('electron').ipcRenderer;
      ipcRenderer.on('fit',self.ipcHandler.bind(self));
    }
    onRef=(ref)=>{this.child=ref;}
    ipcHandler(event,arg){
      if(arg=='undo') this.undo();
      else if(arg=='addpt') this.child.add_pt();
    }
    undo(){
      const cnt=this.child.state.cnt;
      if(cnt) this.child.rm_pt(cnt-1);
      else console.log('no pts left');
    }
    render(){return <Fit onRef={this.onRef} />;}
}
ReactDOM.render(<LinearFit />, document.getElementById("root"));
