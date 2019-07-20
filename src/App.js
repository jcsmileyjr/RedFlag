import React, { Component } from "react";
import './App.css';
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users
import Incident from "./screen/Incident/Incident";//Incident report form to create a incident.



class App extends Component {
  constructor(props){
    super(props);
    this.state={currentView:"login"};
  }
  render(){
    return (
      <Container>
        <Row>
          {this.state.currentView === "login" && <Login />}
          {this.state.currentView === "incident" && <Incident />}
        </Row>
      </Container>
    );
  }

}

export default App;
