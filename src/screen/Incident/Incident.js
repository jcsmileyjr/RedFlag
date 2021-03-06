import React, { useState } from "react";
import './incident.css';//stylesheet for this component
import {Container, Row, Col, DropdownButton, Dropdown} from 'react-bootstrap';
import {IncidentState} from '../../App';//Context state transferring shared state and funtionality  
import {getListOfAgents} from './IncidentData';//List of all agent names

import Nav from '../../components/Nav/Nav';
import InputText from '../../components/InputText/InputText';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import ActionButton from '../../components/ActionButton/ActionButton';

//names of the current casinos in Tunica
const casinoNames = ["GoldStrike", "Horseshoe", "1st Jackpot", "Sam's Town", "Hollywood", "Fitz Casino", "Isle of Capri"];

//type of gaming incidents
const incidentTypes = ["Dispute", "Complaint", "Jackpot", "Criminal", "Minor Gaming"];

//Screen that allows the user to create a initial incident report
export default function Incident(props) {
    const [casino, setCasino] = useState("Pick a Casino");//react hook to update dropdown select casino button title
    const [type, setType] = useState("Pick an Incident");//react hook to update dropdown select incident type button title
    const [agent, setAgent] = useState("Pick an Agent");//react hook to update dropdown select incident agent button title

    const agents = getListOfAgents();
    return(
        <IncidentState.Consumer>
            {context => 
                <Container className="center">
                    {/*Nav Bar */}
                    <Nav menu={false} />

                    {/*Page Title */}
                    <Row><Col className="pageTitleStyle"> Create an Incident Report</Col></Row>

                    {/*User will input Patron/Suspect Name */}
                    <section>          
                        <Row><Col><InputText updateState= {context.getPatronName} inputType="text" text="Type Patron Name" /></Col></Row>
                        {props.formError==="patronName" &&
                            <Row className="error"><Col>Error, Please ensure patron name isn't empty</Col></Row>
                        }                         
                    </section>                   

                    {/*User will choose a incident type from a dropdown box */}
                    <section>           
                        <Row>
                            <Col>
                                <DropdownButton size="lg" id="showIncidentTypes" title={type} variant="secondary">
                                    {incidentTypes.map((type, index) =>(<Dropdown.Item key={index} onClick={()=>{setType(type);context.getIncidentType(type)}}>{type}</Dropdown.Item>))}
                                </DropdownButton>
                            </Col>
                        </Row>
                        {props.formError==="type" &&
                            <Row className="error"><Col>Error, Please choose a incident type</Col></Row>
                        }                        
                    </section>                    

                    {/*User will choose a casino from a dropdown box */}
                    <section>         
                        <Row>
                            <Col>
                                <DropdownButton size="lg" id="showCasinoNames" title={casino} variant="secondary" >
                                    {casinoNames.map((name, index) =>(<Dropdown.Item key={index} onClick={()=>{setCasino(name);context.getCasino(name)}}>{name}</Dropdown.Item>))}
                                </DropdownButton>
                            </Col>
                        </Row>
                        {props.formError==="casino" &&
                            <Row className="error"><Col>Error, Please choose a casino</Col></Row>
                        }                        
                    </section>

                    {/*User will pick a date */}
                    <section>           
                        <Row><Col><InputText updateState= {context.getDate} inputType="date" /></Col></Row>
                        {props.formError==="date" &&
                            <Row className="error"><Col>Error, incorrect date</Col></Row>
                        }                         
                    </section>   

                    {props.auth === "supervisor" &&
                        <section>
                        <Row>
                            <Col>
                                <DropdownButton size="lg" id="showAgentNames" title={agent} variant="secondary" >
                                    {agents.map((agent, index) =>(<Dropdown.Item key={index} onClick={()=>{setAgent(agent);context.getAgent(agent)}}>{agent}</Dropdown.Item>))}
                                </DropdownButton>
                            </Col>
                        </Row>
                        </section>
                    }                                    

                    {/*Submit Button to create incident and transfer user to active cases page */}
                    <section>
                        <Row><Col><SubmitButton submit={context.reportIncident} /></Col></Row> 
                    </section>                    

                    {/*Action buttons, Log out and View Cases */} 
                    <section>
                        <ActionButton buttonColor="warning" title="View Cases" submit={context.showReports} />
                    </section>

                    <section>
                        <ActionButton buttonColor="danger" title="Log Out" submit={context.logOut} />
                    </section>                                
                </Container>
            }
        </IncidentState.Consumer>
    );
}