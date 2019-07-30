const credentials = [{"username":"test", "pwd":"test", "auth":"agent"}, {"username":"jHenry123", "pwd":"hammer", "auth":"supervisor"}, {"username":"jAdam456", "pwd":"oldman", "auth":"agent"}]; 

 //Method to check if the user enter username and pwd match a record in the database. If so, go to next screen based on authoration.
  export function CheckLogIn(name, password){
    let passFail = {"passFail":false};//If true, then username/pwd is correct. initiate to false, 
    
    //Loop through database of login credentials to check if entered username and pwd is legit. 
    credentials.forEach(function(account){
        if(account.username===name && account.pwd === password){
          passFail = {"passFail":true, "auth":account.auth};
        }
    });

    fetch('/incidents')
    .then(function(response){
      return response.json();
    })
    .then(function(reports){
      console.log(reports);
    })
    .catch(function(err){
      console.log(err);
    });
   
    return passFail;
  }