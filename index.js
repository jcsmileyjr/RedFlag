const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

//configure express to use bodyparser as a middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var incidents = require('./src/incidents.json');
var creds = require('./src/credentials.json');

app.get("/incidents", function(req, res){

  res.json(creds);
  res.end();
});

app.post("/cred", function(req, res){
  var userName = req.body.name;
  var pwd = req.body.password;
  var info = {};
  
  info.passFail = false;

  creds.forEach( account => {
    if(account.username === userName && account.pwd === pwd){
      info.username = account.username;
      info.auth = account.auth;
      info.passFail = true;
    }
  });

  res.json(info);
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

console.log(`Listening on ${port}`);
