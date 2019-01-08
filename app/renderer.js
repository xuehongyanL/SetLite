import React from 'react'
import ReactDOM from 'react-dom'
import {
  Col, Panel, Button, ButtonGroup, ListGroup,
  ListGroupItem, FormGroup, FormControl, InputGroup
} from 'react-bootstrap'

const {load, save} = require('../addons/fileIO')
const {FitFunction} = require('../addons/LinearFunction')
const {Statistics} = require('../addons/Statistics')
const {FitPlot} = require('../addons/FitPlot')
const {LinearModelFit} = require('../addons/LinearModelFit')
const {DirectProportionFit} = require('../addons/DirectProportionFit')
const {DataFrame} = require('../addons/DataFrame')

class Input extends React.Component {
  render() {
    return (
      <FormGroup id={this.props.id + 'input'} validationState={this.props.mode}>
        <InputGroup bsSize="large">
          <InputGroup.Addon>{this.props.name}</InputGroup.Addon>
          <FormControl type="text" id={this.props.id}
            placeholder={'your ' + this.props.name + ' here'} value={this.props.value || ''}
            onChange={this.props.onChange}/>
        </InputGroup>
        <FormControl.Feedback/>
      </FormGroup>
    )
  }
}

class Fit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {nowxVal: NaN, nowyVal: NaN, nowxMode: 'warning', nowyMode: 'warning',}
    this.df = new DataFrame(['x', 'y'])
    this.Stat = new Statistics()
    this.xianxingFit = () => {
      FitPlot(this.df, LinearModelFit(this.Stat.dat), 'plot')
      $('#collapseOne').collapse('show')
    }
    this.zhengbiliFit = () => {
      FitPlot(this.df, DirectProportionFit(this.Stat.dat), 'plot')
      $('#collapseOne').collapse('show')
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  initState() {
    this.setState(
      {nowxVal: NaN, nowyVal: NaN, nowxMode: 'warning', nowyMode: 'warning'}
    )
  }

  handlerChange(event) {
    let newVal = event.target.value
    newVal = (newVal.match(/^\s+$/) || newVal == '') ? NaN : newVal
    let id = event.target.id
    this.setState({
      [id + 'Val']: newVal,
      [id + 'Mode']: (Number(newVal) || newVal == 0) ? 'success' : 'error'
    })
  }

  add_pt() {
    let [x, y] = [Number(this.state.nowxVal), Number(this.state.nowyVal)]
    if (!x) this.setState({nowxMode: 'error'})
    if (!y) this.setState({nowyMode: 'error'})
    if ((!x && x != 0) || (!y && y != 0)) {
      alert('invalid value')
      return
    }
    let record = {'x': x, 'y': y}
    this.df.add(record)
    this.Stat.doo(record)
    this.initState()
  }

  rm_pt(id) {
    let record = this.df.loc(id)
    this.df.drop(id)
    this.Stat.undo(record)
    this.setState(this.state)
  }

  render() {
    let self = this
    let records = this.df.to_record().map(function (record, idx) {
      return (
        <ListGroupItem key={idx}>
          <button onClick={() => {
            self.rm_pt(idx)
          }}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          &nbsp;&nbsp;&nbsp;({record.x},{record.y})
        </ListGroupItem>)
    })
    let statistics = []
    for (let key in self.Stat.dat) {
      if (self.Stat.vis[key]) statistics.push(
        <ul key={key}>{key}: {self.Stat.dat[key].toFixed(4)}</ul>
      )
    }
    return (
      <div>
        <Col id="upContainer" sm={12} lg={8}>
          <Input id="nowx" name="x" mode={this.state.nowxMode}
            value={this.state.nowxVal} onChange={this.handlerChange.bind(this)}/>
          <Input id="nowy" name="y" mode={this.state.nowyMode}
            value={this.state.nowyVal} onChange={this.handlerChange.bind(this)}/>
        </Col>
        <Col id="middleContainer" sm={12} lg={8}>
          <Panel bsStyle="default">
            <Panel.Heading><Panel.Title toggle>Plot</Panel.Title></Panel.Heading>
            <Panel.Collapse id="collapseOne">
              <Panel.Body sm={12}>
                <div id="plot"></div>
              </Panel.Body>
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
            <ListGroup>{records}</ListGroup>
          </Col>
          <Col id="rightContainer" sm={6}>
            <Panel bsStyle="info">
              <Panel.Heading><Panel.Title>Statistics</Panel.Title></Panel.Heading>
              <Panel.Body>{statistics}</Panel.Body>
            </Panel>
          </Col>
        </Col>
      </div>)
  }
}

class FitManager extends React.Component {
  constructor() {
    super()
    const self = this
    const ipcRenderer = require('electron').ipcRenderer
    ipcRenderer.on('fit', self.ipcHandler.bind(self))
  }

  onRef = (ref) => {
    this.child = ref
  }

  ipcHandler(event, arg) {
    if (arg == 'save') save(this.child.df.to_csv())
    if (arg == 'load') {
      load().split('\r\n').map((value, index) => {
        console.log(this)
        let temp = value.split(',')
        let record = {x: Number(temp[0]), y: Number(temp[1])}
        this.child.df.add(record)
        this.child.Stat.doo(record)
      })
      this.child.initState()
    }
  }

  render() {
    return <Fit onRef={this.onRef}/>
  }
}

ReactDOM.render(<FitManager/>, document.getElementById('root'))
