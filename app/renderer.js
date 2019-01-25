import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
  Panel
} from 'react-bootstrap';
import {HotTable} from '@handsontable/react';
import {InlineMath} from 'react-katex';

const {load, save} = require('../addons/fileIO');
const {FitFunction} = require('../addons/LinearFunction');
const {Statistics} = require('../addons/Statistics');
const {FitPlot} = require('../addons/FitPlot');
const {LinearModelFit} = require('../addons/LinearModelFit');
const {DirectProportionFit} = require('../addons/DirectProportionFit');
const {DataFrame} = require('../addons/DataFrame');

class Input extends React.Component {
  render() {
    return (
      <FormGroup id={this.props.id + 'Input'} validationState={this.props.mode}>
        <InputGroup bsSize="large">
          <InputGroup.Addon>{this.props.name}</InputGroup.Addon>
          <FormControl type="text" id={this.props.id}
            placeholder={'your ' + this.props.name + ' here'} value={this.props.value || ''}
            onChange={this.props.onChange}/>
        </InputGroup>
        <FormControl.Feedback/>
      </FormGroup>
    );
  }
}

class ModalInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nowxVal: NaN,
      nowyVal: NaN,
      nowxMode: 'warning',
      nowyMode: 'warning',
    };
  }

  initState(){
    this.setState({
      nowxVal: NaN,
      nowyVal: NaN,
      nowxMode: 'warning',
      nowyMode: 'warning',
    });
  }

  handlerChange(event) {
    let newVal = event.target.value;
    newVal = (newVal.match(/^\s+$/) || newVal === '') ? NaN : newVal;
    let id = event.target.id;
    this.setState({
      [id + 'Val']: newVal,
      [id + 'Mode']: (Number(newVal) || Number(newVal) === 0) ? 'success' : 'error'
    });
  }

  close(){
    this.props.close();
    this.initState();
  }

  addPt() {
    let [x, y] = [Number(this.state.nowxVal), Number(this.state.nowyVal)];
    if (!x && x !== 0) this.setState({nowxMode: 'error'});
    if (!y && y !== 0) this.setState({nowyMode: 'error'});
    if ((!x && x !== 0) || (!y && y !== 0)) {
      alert('invalid value');
      return;
    }
    let record = {'x': x, 'y': y};
    this.props.handler(record);
    this.close();
  }

  render() {
    return (
      <div id="modalInput">
        <Modal show={this.props.modalInputShow} onHide={this.props.close}>
          <Modal.Body>
            <Input id="nowx" name="x" mode={this.state.nowxMode}
              value={this.state.nowxVal} onChange={this.handlerChange.bind(this)}/>
            <Input id="nowy" name="y" mode={this.state.nowyMode}
              value={this.state.nowyVal} onChange={this.handlerChange.bind(this)}/>
            <Modal.Footer>
              <Button bsStyle="default" onClick={this.close.bind(this)}>Cancel</Button>
              <Button bsStyle="primary" onClick={this.addPt.bind(this)}>Add Point</Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

class Fit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInputShow: false,
      plotExpanded: false,
      fit: null,
      record: [{x:null,y:null}]
    };
    this.df = new DataFrame(['x', 'y']);
    this.Stat = new Statistics();
    this.xianxingFit = () => {
      this.setState({fit:LinearModelFit(this.Stat.dat),plotExpanded:true});
    };
    this.zhengbiliFit = () => {
      this.setState({fit:DirectProportionFit(this.Stat.dat),plotExpanded:true});
    };
    this.dataRef = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  updateFrame(){
    let records = this.state.record;
    while(this.df.length > 0){
      this.rm_pt(0);
    }
    for(let record of records){
      record = {x:Number(record['x']),y:Number(record['y'])};
      if((!record['x'] && record['x'] !== 0) || (!record['y'] && record['x'] !== 0)) continue;
      this.df.add(record);
      this.Stat.doo(record);
    }
    this.setState({record:this.df.length ? this.df.to_record() : {x:null,y:null}});
  }

  add_pt(record) {
    this.df.add(record);
    this.setState({record:this.df.to_record()});
    this.Stat.doo(record);
  }

  rm_pt(id) {
    let record = this.df.loc(id);
    this.df.drop(id);
    this.setState({record:this.df.to_record()});
    this.Stat.undo(record);
  }

  render() {
    let self = this;
    let statistics = [];
    for (let key in self.Stat.dat) {
      if (self.Stat.vis[key]) statistics.push(
        <ul key={key}><InlineMath>{self.Stat.names[key]}</InlineMath>: {self.Stat.dat[key].toFixed(4)}</ul>
      );
    }
    return (
      <div>
        <Col id="upContainer" sm={12} lg={8}>
          <ModalInput
            modalInputShow={this.state.modalInputShow}
            close={function(){this.setState({modalInputShow:false});}.bind(this)}
            handler={this.add_pt.bind(this)}
          />
        </Col>
        <Col id="middleContainer" sm={12} lg={8}>
          <Panel bsStyle="default" expanded={this.state.plotExpanded}>
            <Panel.Heading>
              <Panel.Title>
                <a onClick={()=>this.setState({plotExpanded:!this.state.plotExpanded})}>Plot</a>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body sm={12}>
                <FitPlot pts={this.df.to_record()} fit={this.state.fit} />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Col>
        <Col id="downContainer" sm={12} lg={8}>
          <Col id="leftContainer" sm={6}>
            <ButtonGroup>
              <Button
                bsStyle="default"
                onClick={function(){this.setState({modalInputShow:true});}.bind(this)}
              >ADD POINT</Button>
              <Button
                bsStyle="default"
                onClick={this.updateFrame.bind(this)}
              >&nbsp;&nbsp;UPDATE&nbsp;&nbsp;</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                bsStyle="default"
                onClick={this.xianxingFit.bind(this)}
              >&nbsp;&nbsp;线性回归&nbsp;&nbsp;&nbsp;</Button>
              <Button
                bsStyle="default"
                onClick={this.zhengbiliFit.bind(this)}
              >正比例回归</Button>
            </ButtonGroup>
            <hr />
            <HotTable
              data={this.state.record}
              ref={this.dataRef}
              colHeaders={['X','Y']}
              stretchH={'all'}
            />
          </Col>
          <Col id="rightContainer" sm={6}>
            <Panel bsStyle="info">
              <Panel.Heading><Panel.Title>Statistics</Panel.Title></Panel.Heading>
              <Panel.Body>{statistics}</Panel.Body>
            </Panel>
          </Col>
        </Col>
      </div>);
  }
}

class FitManager extends React.Component{
  constructor(props){
    super(props);
    const self = this;
    const ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.on('fit',self.ipcHandler.bind(self));
  }
  onRef=(ref)=>{this.child = ref;};
  ipcHandler(event,arg){
    if(arg === 'save') save(this.child.df.to_csv());
    if(arg === 'load'){
      load().split('\r\n').map((value,index)=>{
        let temp = value.split(',');
        let record = {x:Number(temp[0]),y:Number(temp[1])};
        this.child.df.add(record);
        this.child.Stat.doo(record);
      });
      this.child.setState({record:this.child.df.to_record()});
      this.child.initState();
    }
  }
  render(){return <Fit onRef={this.onRef} />;}
}

ReactDOM.render(<FitManager/>, document.getElementById('root'));
