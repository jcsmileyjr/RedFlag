import React, { Component } from "react";
import './App.css';
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users
import Incident from "./screen/Incident/Incident";//Incident report form to create a incident.

class App extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (
      <Container>
        <Row>
          <Login redTitle="Red" blackTitle="Flag" />
          <Incident redTitle="Red" blackTitle="Flag" />
        </Row>
      </Container>
    );
  }

}

export default App;
