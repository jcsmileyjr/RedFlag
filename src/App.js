import React, { Component } from "react";
import './App.css';
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users
import Incident from "./screen/Incident/Incident";//Incident report form to create a incident.

//notes from https://hackernoon.com/how-do-i-use-react-context-3eeb879169a2 on how to use React's Context
const UserLogIn = React.createContext({});

export const UserLogInProvider = UserLogIn.Provider;
export const UserLogInConsumer = UserLogIn.Consumer;

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      currentView:"login",
      userName:"",
      pwd:"",
    };
  }
/*
  login = () =>{
    this.setState({currentView:"incident"});
  }
*/
  render(){
    return (
        <Container>
          <Row>
            {this.state.currentView === "login" && 
              <UserLogInProvider value={{
                getUserName: (value)=> this.setState({userName:value}),
                getPwd: (value) => this.setState({pwd:value})
                }}>
                <Login />
              </UserLogInProvider> 
            }
            {this.state.currentView === "incident" && <Incident />}
          </Row>
        </Container>
    );
  }

}

export default App;
