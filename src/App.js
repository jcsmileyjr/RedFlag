import React, { Component } from "react";
import './App.css';//global stylesheet
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users
import Incident from "./screen/Incident/Incident";//Incident report form to create a incident.
import Reports from './screen/Reports/Report';//Report page showing all active incident reports
import {CheckLogIn} from "./screen/Login/LoginData";//Method use to confirm username and pwd when user logs in
import {CreateNewIncident} from './screen/Incident/IncidentData';//Method to create a new incident from the Incident form page

//notes from https://hackernoon.com/how-do-i-use-react-context-3eeb879169a2 on how to use React's Context
const UserLogIn = React.createContext({});//Context for Login screen and elements
const UserLogInProvider = UserLogIn.Provider;
export const UserLogInConsumer = UserLogIn.Consumer;

export const IncidentReport = React.createContext({});//Context for incident report's screen and elements
export const ReportState = React.createContext({});//Context for report's screen and elements

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      currentView:"logIn",//route user to different pages in the app
      userName:"",//username used in login process
      pwd:"",//password used in login process
      authoration:"",//authoration use in login process and affect flow of data/screens
      loginError:false,//If login is incorrect, show a error 
      patronName:"",//name of patron use to create a new report
      casino:"",//name of patron use to create a new report
      incidentType:"",//name of patron use to create a new report
      incidentDate:"",//name of patron use to create a new report      
    };
  }

  //Method to confirm if the user enter username and pwd match a record in the database. 
  //If so, go to next screen based on authoration.
  confirmLogIn = () =>{    
    //calls a method from LoginData.js that checks a database against the username and pwd
    const login = CheckLogIn(this.state.userName, this.state.pwd);
    if(login.passFail === true){
      if(login.auth === "supervisor"){//send supervisors to reports screen
        this.setState({currentView: "reports", authoration:login.auth});
      }else{//send agents to initial incident report screen
        this.setState({currentView: "incident", authoration:login.auth});
      }      
    }else {
        this.setState({loginError:true});
    }
  }

  //Method passed to the incident report page with React Context to create a new incident and 
  //move the user to the reports screen.
  initialIncidentReport = () =>{
    CreateNewIncident(this.state.patronName,this.state.casino, this.state.incidentType, this.state.incidentDate, this.state.userName);
    this.setState({currentView:"reports"});
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
                <Login error={this.state.loginError} />
              </UserLogInProvider> 
            }
            {this.state.currentView === "incident" && 
              <IncidentReport.Provider value={{
                getPatronName: (value)=> this.setState({patronName:value}),
                getCasino: (value) => this.setState({casino:value}),
                getIncidentType: (value) => this.setState({incidentType:value}),
                getDate: (value)=> this.setState({incidentDate:value}),
                logOut:()=> this.setState({currentView:"logIn", patronName:"", casino:"",incidentType:"", incidentDate:"", userName:"", pwd:"", loginError:false}),
                reportIncident:() =>this.initialIncidentReport(),
                showReports:() => this.setState({currentView: "reports"}),
              }}>
                <Incident />
              </IncidentReport.Provider>
            }
            {this.state.currentView ==="reports" &&
              <ReportState.Provider value={{
                logOut:()=> this.setState({currentView:"logIn", patronName:"", casino:"",incidentType:"", incidentDate:"", userName:"", pwd:"", loginError:false}),
                newIncident:() => this.setState({currentView: "incident"}),
              }}>
                <Reports auth = {this.state.authoration} />
              </ReportState.Provider>
            }
          </Row>
        </Container>
    );
  }

}

export default App;
