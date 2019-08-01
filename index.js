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

app.get("/incidents", function(req, res) {
  res.json(creds);
  res.end();
});

//Sort through array of saved cases for cases specific to a authorize agent and return those cases
function getAgentCases(name) {
  var cases = {};
  cases.reports = []; //recreate the incidents database schema
  incidents.reports.forEach(report => {
    if (report.agentName === name) {//checks if the log-in agent name matches the agentName property in the record
      cases.reports.push(report);
    }
  });
  return cases;
}

app.post("/cred", function(req, res) {
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
        info.reports = incidents;
        getAgentCases(account.username);
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
  //res.sendFile(path.join(__dirname + "/build/index.html"));
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port);
