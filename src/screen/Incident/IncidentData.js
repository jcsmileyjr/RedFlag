
let activeCases = [];//array of cases assigned for current logged in agent or agent selected by a supervisor

//Method to create a initial incident report object. 
export function CreateNewIncident(patron, casino, incidentType,date ,agent){
    var newCase = {};//blank object
    newCase.agentName = agent;//add the case agent to the object
    newCase.patronName = patron;//add the patron/suspect to the object
    newCase.casinoName = casino;//add the place/casino of the incident
    newCase.incidentType = incidentType;//add the type of incident
    newCase.incidentDate = date;

    activeCases.push(newCase);//add the new incident type to the array of cases
}

//Method call in the Reports.js to get all active incidents reported and calculate days remaining to 
//finish case file
export function GetReports(){
    updateDaysRemaining();//Update the current database remaining days data
    updateColorRepersentingTimeRemaining();//Update the current database color based on days remaining. 

    return activeCases;
}

function updateDaysRemaining(){
    const todayDate = new Date();//Get today's date

    activeCases.forEach(function(report, index){
        const reportDate = Date.parse(report.incidentDate);//convert incident date to milliseconds
        const numberOfMilliseconds = Math.abs(todayDate.getTime() - reportDate);//Get difference of report date and today's date 
        const calcultedDaysRemaining = Math.floor(numberOfMilliseconds/(1000*3600*24));//Number of days between incident date and today's date

        if(report.incidentType === "Crimminal" || report.incidentType ==="Minor Gaming"){
            report.daysRemaining = 30 - calcultedDaysRemaining;//Assign days remaining based on pre-determine allotted days to finish case
        }

        if(report.incidentType === "Disputes" || report.incidentType ==="Complaint"){
            report.daysRemaining = 10 - calcultedDaysRemaining;//Assign days remaining based on pre-determine allotted days to finish case
        }

        if(report.incidentType === "Jackpot"){
            report.daysRemaining = 3 - calcultedDaysRemaining;//Assign days remaining based on pre-determine allotted days to finish case
        }
    });    
}

//Method to update the color of the case in the Report component based on days remaining
function updateColorRepersentingTimeRemaining(){
    activeCases.forEach((report) =>{
        if(report.daysRemaining >= 5){
            report.color = "#D0FCCD";//Green color, agent have plenty of time left
        }else if(report.daysRemaining ===3 || report.daysRemaining === 4 ){
            report.color = "#FBF2A8";//Yellow color, agent is running out of time
        }else{
            report.color = "#FBA4A4";//Red color, agent needs some tough love
        }
    });
}

