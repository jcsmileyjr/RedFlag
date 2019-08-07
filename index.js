const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

//configure express to use bodyparser as a middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var incidents = require("./src/incidents.json");
var creds = require("./src/credentials.json");

//return list of agents names to send to supvisors
function getListOfAgents(){
  var listOfAgents = [];//array of agents names
  creds.forEach((agent)=>{
    if(agent.auth === "agent"){
      listOfAgents.push(agent.username);
    }
  });

  return listOfAgents;
}

//Sort through array of saved cases for cases specific to a authorize agent and return those cases
function getAgentCases(name) {
  var cases = {};
  cases.reports = []; //recreate the incidents database schema

  //checks if the log-in agent name matches the agentName property in the record
  incidents.reports.forEach(report => {
    if (report.agentName === name) {
      cases.reports.push(report);
    }
  });
  return cases;
}

//Route to delete a report in the server from the client
//First check if username and password is correct, then search for database of incidents for id
//if found, delete it. 
app.put("/deleteReport", function(req, res) {
  var userName = req.body.name;
  var pwd = req.body.password;
  var newReport = req.body.newIncident;//incident to be deleted
  
  creds.forEach(account => {
    if (account.username === userName && account.pwd === pwd) {
      incidents.reports.forEach((report,index) =>{
        if(report.id === newReport.id){  
          incidents.reports.splice(index,1);        
        }
      });
    }
  });

  res.end();
});

//TASK: ADD CODE FOR UNSUCCESSFUL UPDATE//
//Route to update the current active incidents from a client
app.put("/newReport", function(req, res) {
  var userName = req.body.name;
  var pwd = req.body.password;
  var newReport = req.body.newIncident;
  var numberOfReports = incidents.reports.length;
  newReport.id = numberOfReports + 1;

  creds.forEach(account => {
    if (account.username === userName && account.pwd === pwd) {
      incidents.reports.push(newReport);
    }
  });

  res.end();
});

//route to allow a user to login and get authorization level and array of current incident reports
//A user's user-name and password is sent from the client to the server.
app.post("/login", function(req, res) {
  var userName = req.body.name;
  var pwd = req.body.password;
  var info = {};
  info.passFail = false;

  //Firt checks if the username and password is in the cedentials.json
  //If true, returns the name, authorization level, true boolean, and a list of reports based on authoriation.
  //If false, send the false boolean to the client
  creds.forEach(account => {
    if (account.username === userName && account.pwd === pwd) {
      info.username = account.username;
      info.auth = account.auth;
      info.passFail = true;
      if (account.auth === "supervisor") {
        info.reports = incidents;//return all incident reports
        info.agents = getListOfAgents();//return list of all frontline agents
      } else {
        info.reports = getAgentCases(account.username);
      }
    }
  });

  res.json(info); //send data to client.
  res.end();
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);
