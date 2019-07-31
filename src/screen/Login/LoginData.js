//const credentials = [{"username":"test", "pwd":"test", "auth":"agent"}, {"username":"jHenry123", "pwd":"hammer", "auth":"supervisor"}, {"username":"jAdam456", "pwd":"oldman", "auth":"agent"}]; 
 export function isLogIn(pass){
   return CheckLogIn
 }

 //Method to check if the user enter username and pwd match a record in the database. If so, go to next screen based on authoration.
  export function CheckLogIn(name, password){
    let passFail = false;//If true, then username/pwd is correct. initiate to false, 
    var info = {"name": name, "password": password};
    fetch('/cred', {method:"POST", body:JSON.stringify(info), headers:{'Content-Type':'application/json'}})
      .then(function(response){
        return response.json();
      })
      .then(function(login){
        console.log(login.passFail);
        passFail= login.passFail;
        return passFail;
      });

    // fetch('/incidents')
    // .then(function(response){
    //   return response.json();
    // })
    // .then(function(reports){
    //   console.log(reports);
    // })
    // .catch(function(err){
    //   console.log(err);
    // });
   //console.log("End of line " + passFail.passFail);
    //return passFail.passFail;
  }