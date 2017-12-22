import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
  Col
} from 'reactstrap';

import {
  getFilterList,
  getProductByFilters,
} from './apiCalls';

export default class App extends Component {
  constructor(props){
    super(props);
    this._filters = getFilterList();
    this.state = {
      filters: this._filters,
      products: [],
    }
  }
  componentDidMount(){
    getProductByFilters([]).then(
      resp => this.setState({ products: resp })
    );
  }
  _selecteFilter(type){
    this.setState(
      {
        filters: this.state.filters.map(
          e => Boolean(e.type===type)?(
            { ...e, selected: !e.selected }
          ):e
        )
      },
      this._makeAPICall.bind(this)
    );
  }
  _makeAPICall(){
    getProductByFilters(
      this.state.filters.filter(e => e.selected)
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
            <Col xs="6" sm="3" md="3" lg="4">
              <ListGroup>
                {this.state.filters.map(this._renderEachFilter.bind(this))}
              </ListGroup>
            </Col>
            <Col xs="6" sm="9" md="9" lg="8">
              <Row>
                {this.state.products.map(this._renderEachProduct)}
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
      <Col xs="12" sm="6" md="6" lg="6" key={index}>
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
      <ListGroupItem
        key={index}
        active={filterItem.selected}
        onClick={this._selecteFilter.bind(this, filterItem.type)}
        style={{ cursor: 'pointer', margin: '10px' }}
      >
        {filterItem.displayName}
        {Boolean(filterItem.childs)?(
          <ListGroup className={(
            filterItem.selected?'list-childs-selected':''
          )}>
            {filterItem.childs.map(this._renderEachFilter.bind(this))}
          </ListGroup>
        ):null}
      </ListGroupItem>
    )
  }
}
