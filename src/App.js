import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap';

import {
  getFilterList,
  getProductByFilters,
} from './apiCalls';

function __compCol(obj){
  var __keys = Object.keys(obj);
  return _.zipObject(__keys, __keys.map(e => 12-obj[e]));
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      filters: [],
      products: [],
    }
    this.__filterCol = {
      xs: 6, sm: 6, md: 5, lg: 4
    }
    this.__productCol = __compCol(this.__filterCol);
  }
  componentDidMount(){
    getProductByFilters([]).then(
      resp => this.setState({ products: resp })
    );

    getFilterList().then(
      resp => this.setState({ filters: resp })
    )
  }
  _selecteFilter(parentType, childType){
    this.setState(
      {
        filters: this.state.filters.map(
          e => Boolean(e.type===parentType)?(
            {
              ...e,
              childs: e.childs.map(
                ce => Boolean(ce.type===childType)?(
                  { ...ce, selected: !ce.selected }
                ):ce
              )
            }
          ):e
        )
      },
      this._makeAPICall.bind(this)
    );
  }
  _makeAPICall(){
    var _ans = Object.assign(
      {},
      ...(
        this.state.filters.map(
          e => (
            { [e.type]: e.childs.filter(ce => ce.selected).map(ce => ce.type) }
          )
        ).filter(ee => !!ee[Object.keys(ee)[0]].length)
      )
    );
    console.log(_ans);
    getProductByFilters(
      _ans
    ).then(
      rep => this.setState({ products: rep })
    )
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hola guys</h1>
        </header>
        <Container>
          <Row>
            <Col {...this.__filterCol} >
              <ListGroup>
                {this.state.filters.length?(
                  this.state.filters.map(this._renderEachFilter.bind(this))
                ):(
                  <Alert color="primary">
                    {"Loading Filters ..."}
                  </Alert>
                )}
              </ListGroup>
            </Col>
            <Col {...this.__productCol} >
              <Row>
                {this.state.products.length?(
                  this.state.products.map(this._renderEachProduct)
                ):(
                  <Alert color="secondary">
                    {"Loading Products ..."}
                  </Alert>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  _renderEachProduct(product, index){
    var _cardImgProps = {
      top: true,
      width: '100%',
      src: product.imgSrc,
      alt: 'Product Image ' + index
    }
    return (
      <Col xs="12" sm="12" md="12" lg="6" key={index}>
        <Card style={{ margin: "30px"}}>
          <CardImg {..._cardImgProps} />
          <CardBody>
            <CardTitle>{product.title}</CardTitle>
            <CardText>{product.description}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
  _renderEachFilter(filterItem, index){
    return (
      <ListGroupItem key={index} style={{ margin: '2px' }}>
        {filterItem.displayName}
        <ListGroup>
          {filterItem.childs.map(
            this._renderChildFilter.bind(this, filterItem.type)
          )}
        </ListGroup>
      </ListGroupItem>
    )
  }
  _renderChildFilter(parentType, childFilter, index){
    return (
      <ListGroupItem
        key={index}
        active={childFilter.selected}
        onClick={this._selecteFilter.bind(this, parentType, childFilter.type)}
        style={{ cursor: 'pointer', margin: '10px' }}
      >
        {childFilter.displayName}
      </ListGroupItem>
    );
  }
}
