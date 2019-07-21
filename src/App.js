import React, { Component } from "react";
import './App.css';
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users
import Incident from "./screen/Incident/Incident";//Incident report form to create a incident.

//notes from https://hackernoon.com/how-do-i-use-react-context-3eeb879169a2 on how to use React's Context
const UserLogIn = React.createContext({});
const UserLogInProvider = UserLogIn.Provider;
export const UserLogInConsumer = UserLogIn.Consumer;

export const IncidentReport = React.createContext({});

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      currentView:"logIn",
      userName:"",
      pwd:"",
    };
  }

  render(){
    return (
        <Container>
          <Row>
            {this.state.currentView === "logIn" && 
              <UserLogInProvider value={{
                getUserName: (value)=> this.setState({userName:value}),
                getPwd: (value) => this.setState({pwd:value}),
                logIn: ()=> this.setState({currentView:"incident"}),
                }}>
                <Login />
              </UserLogInProvider> 
            }
            {this.state.currentView === "incident" && 
              <IncidentReport.Provider value={{
                logOut:()=> this.setState({currentView:"logIn"})
              }}>
                <Incident />
              </IncidentReport.Provider>
            }
          </Row>
        </Container>
    );
  }

}

export default App;
