import React, { Component } from "react";
import './App.css';
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users
import Incident from "./screen/Incident/Incident";//Incident report form to create a incident.

const loginData = [{"username":"test", "pwd":"test", "auth":"agent"}, {"username":"jHenry123", "pwd":"hammer", "auth":"supervisor"}, {"username":"jAdam456", "pwd":"oldman", "auth":"agent"}];

//notes from https://hackernoon.com/how-do-i-use-react-context-3eeb879169a2 on how to use React's Context
const UserLogIn = React.createContext({});//Context for Login page and elements
const UserLogInProvider = UserLogIn.Provider;
export const UserLogInConsumer = UserLogIn.Consumer;

export const IncidentReport = React.createContext({});//Context for incident report page and elements

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      currentView:"logIn",
      userName:"",
      pwd:"",
    };
  }

  //Method to check if the user enter username and pwd match a record in the database. If so, go to next screen based on authoration.
  checkLogIn = () =>{
    let passFail = false;//If true, then username/pwd is correct. initiate to false, 
    const name = this.state.userName;//get the current username entered
    const password = this.state.pwd;//get the current password entered
    
    //Loop through database of login credentials to check if entered username and pwd is legit. 
    loginData.forEach(function(account){
        if(account.username===name && account.pwd === password){
          passFail = true;
        }
    });
    
    if(passFail === true){
      this.setState({currentView: "incident"});
    }
  }

  render(){
    return (
        <Container>
          <Row>
            {this.state.currentView === "logIn" && 
              <UserLogInProvider value={{
                getUserName: (value)=> this.setState({userName:value}),
                getPwd: (value) => this.setState({pwd:value}),
                logIn: this.checkLogIn,
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
