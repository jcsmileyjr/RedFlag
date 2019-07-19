import React, { Component } from "react";
import './App.css';
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users

class App extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (
      <Container>
        <Row>
          <Login />
        </Row>
      </Container>
    );
  }

}

export default App;
