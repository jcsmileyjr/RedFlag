import React, { Component } from "react";
import './App.css';//global stylesheet
import {Container, Row} from 'react-bootstrap';

import Login from "./screen/Login/login.js"; //Login page for all users
import Incident from "./screen/Incident/Incident";//Incident report form to create a incident.
import Reports from './screen/Reports/Report';//Report page showing all active incident reports

import {CreateNewIncident} from './screen/Incident/IncidentData';//Method to create a new incident from the Incident form page
import {deleteReport} from './screen/Incident/IncidentData'; //Method to remove incidents from the database
import {updateActiveCasesUponLogin} from './screen/Incident/IncidentData';//Method to get most up to date array of cases to update acticecases array in the IncidentData.js
import {updateListOfAgents} from './screen/Incident/IncidentData';//Method to update app's list of agents from server during log in

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
      incidentError:"",//If there is a error during incident creation
      patronName:"",//name of patron use to create a new report
      casino:"",//name of patron use to create a new report
      incidentType:"",//name of patron use to create a new report
      incidentDate:"",//name of patron use to create a new report
      incidentAgentName:"",//used by supervisor to create a new report      
    };
  }

  //Method to confirm if the user enter a correct username and pwd match a record in the database. 
  //If so, go to next screen based on authoration.
  //Use as a callback in the isLogIn() method (makes a fetch call to the server)
  confirmLogIn = (login) =>{    
    if(login.passFail === true){
      updateActiveCasesUponLogin(login.reports);//update local activecases array of reports with copy from server
      if(login.auth === "supervisor"){//send supervisors to reports screen
        updateListOfAgents(login.agents);//update list of agents to be use on Incident page by supervisor
        this.setState({currentView: "reports", authoration:login.auth, loginError:false});
      }else{//send agents to initial incident report screen
        this.setState({currentView: "incident", authoration:login.auth, loginError:false});
      }      
    }else {
        this.setState({loginError:true});
    }
  }

  //Use a fetch method to make a http post request to the server
  //If successfull, return the true, the user auth level, and a database of saved cases
  isLogIn = (callback) => {
    var info = {"name": this.state.userName, "password":this.state.pwd};
    fetch('/login', {method:"POST", body:JSON.stringify(info), headers:{'Content-Type':'application/json'}})
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        callback(data);
      })
  }

  //TASK: ADD CODE FOR UNSUCCESSFUL UPDATES (this updates the client but could fail to update the server)
  //Method passed to the incident report screen with React Context to create a new incident and 
  //move the user to the reports screen. The new incident is updated to the server and local array for presentation
  initialIncidentReport = () =>{
    //Validation check for the inputted patron name and date.
    const testPattern = /[^a-zA-Z. ]/;//ensure only letters, periods, and spaces
    if(this.state.patronName==="" || testPattern.test(this.state.patronName)){
      this.setState({currentView:"incident", incidentError:"patronName"});
    }else if(isNaN(this.state.incidentDate)=== false || this.state.incidentDate===""){
      this.setState({currentView:"incident", incidentError:"date"});
    }else if(this.state.casino ===""){
      this.setState({currentView:"incident", incidentError:"casino"});
    }else if(this.state.incidentType === ""){
      this.setState({currentView:"incident", incidentError:"type"});
    }else{
      var newIncident = {};
      if(this.state.auth === "agent"){
        newIncident = CreateNewIncident(this.state.patronName,this.state.casino, this.state.incidentType, this.state.incidentDate, this.state.userName);
      }else{//supervisor creates a incident
        newIncident = CreateNewIncident(this.state.patronName,this.state.casino, this.state.incidentType, this.state.incidentDate, this.state.incidentAgentName);
      }      
      var info = {"name": this.state.userName, "password":this.state.pwd, "newIncident":newIncident};//object to be sent to server
      
      fetch('/newReport', {method:"PUT", body:JSON.stringify(info), headers:{'Content-Type':'application/json'}});   

      //Change view and clear out old data
      this.setState({currentView:"reports", incidentError:"", patronName:"", casino:"", incidentDate:"", incidentType:""});
    
    }
  }

  //method used on the reports screen to delete a incident report
  //And redirect to the same view to force a update of the data
  closeReport = (index)=>{
    var newIncident = deleteReport(index);
    this.setState({currentView:"reports"});

    var info = {"name": this.state.userName, "password":this.state.pwd, "newIncident":newIncident};
    
    fetch('/deleteReport', {method:"PUT", body:JSON.stringify(info), headers:{'Content-Type':'application/json'}});
  }

  render(){
    return (
        <Container>
          <Row>
            {this.state.currentView === "logIn" && 
              <UserLogInProvider value={{
                getUserName: (value)=> this.setState({userName:value}),
                getPwd: (value) => this.setState({pwd:value}),
                logIn: () => this.isLogIn(this.confirmLogIn),
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
                getAgent: (value) => this.setState({incidentAgentName:value}),
                logOut:()=> this.setState({currentView:"logIn", patronName:"", casino:"",incidentType:"", incidentDate:"", userName:"", pwd:"", loginError:false}),
                reportIncident:() =>this.initialIncidentReport(),
                showReports:() => this.setState({currentView: "reports"}),
              }}>
                <Incident auth = {this.state.authoration} formError={this.state.incidentError} />
              </IncidentReport.Provider>
            }
            {this.state.currentView ==="reports" &&
              <ReportState.Provider value={{
                logOut:()=> this.setState({currentView:"logIn", patronName:"", casino:"",incidentType:"", incidentDate:"", userName:"", pwd:"", loginError:false}),
                newIncident:() => this.setState({currentView: "incident"}),
                closeReport: (number)=> this.closeReport(number),
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
