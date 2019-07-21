
let activeCases = [];//array of cases assigned for current logged in agent or agent selected by a supervisor

//Method to create a initial incident report object. 
export function CreateNewIncident(patron, casino, incidentType,date ,agent){
    var newCase = {};//blank object
    newCase.agentName = agent;//add the case agent to the object
    newCase.patronName = patron;//add the patron/suspect to the object
    newCase.casinoName = casino;//add the place/casino of the incident
    newCase.incidentType = incidentType;//add the type of incident
    newCase.incidentDate = date;
console.table(newCase);//TESTING, DELETE DELETE DELETE
    activeCases.push(newCase);//add the new incident type to the array of cases
}