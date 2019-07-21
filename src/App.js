import React, { Component } from "react";
import './App.css';
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users
import Incident from "./screen/Incident/Incident";//Incident report form to create a incident.
import {CheckLogIn} from "./screen/Login/LoginData";//Method use to confirm username and pwd when user logs in

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
      patronName:"",
      casino:"",
      incidentType:"",
    };
  }

  //Method to confirm if the user enter username and pwd match a record in the database. If so, go to next screen based on authoration.
  confirmLogIn = () =>{    
    //calls a method from LoginData.js that checks a database against the username and pwd
    if(CheckLogIn(this.state.userName, this.state.pwd)){
      this.setState({currentView: "incident"});
    }else {

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
                logIn: () => this.confirmLogIn(),
                }}>
                <Login />
              </UserLogInProvider> 
            }
            {this.state.currentView === "incident" && 
              <IncidentReport.Provider value={{
                getPatronName: (value)=> this.setState({patronName:value}),
                getCasino: (value) => this.setState({casino:value}),
                getIncidentType: (value) => this.setState({incidentType:value}),
                logOut:()=> this.setState({currentView:"logIn", patronName:"", casino:"",incidentType:"", userName:"", pwd:""})
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
