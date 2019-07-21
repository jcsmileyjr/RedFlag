import React, { useState } from "react";
import '../../App.css';
import {Container, Row, Col, DropdownButton, Dropdown} from 'react-bootstrap';
import {IncidentReport} from '../../App';

import Nav from '../../components/Nav/Nav';
import InputText from '../../components/InputText/InputText';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import ActionButton from '../../components/ActionButton/ActionButton';

//names of the current casinos in Tunica
const casinoNames = ["GoldStrike", "Horseshoe", "1st Jackpot", "Sam's Town", "Hollywood", "Fitz", "Isle of Capri"];

//type of gaming incidents
const incidentTypes = ["Disputes", "Complaint", "Jackpot", "Crimminal", "Minor Gaming"];

//Screen that allows the user to create a initial incident report
export default function Incident(props) {
    const [casino, setCasino] = useState("Casino Name");//react hook to update dropdown select casino button title
    const [type, setType] = useState("Incident Type");//react hook to update dropdown select incident type button title

    return(
        <IncidentReport.Consumer>
            {context => 
                <Container className="center">
                    {/*Nav Bar */}
                    <Nav />

                    {/*Page Title */}
                    <Row><Col className="pageTitleStyle">Initial Incident Report</Col></Row>

                    {/*User will input Patron/Suspect Name */}
                    <section>
                        <Row><Col>Patron Name</Col></Row>            
                        <Row><Col><InputText updateState= {context.getPatronName} inputType="text" /></Col></Row>
                    </section>

                    {/*User will choose a casino from a dropdown box */}
                    <section>           
                        <Row>
                            <Col>
                                <DropdownButton size="lg" id="showCasinoNames" title={casino} variant="success">
                                    {casinoNames.map((name, index) =>(<Dropdown.Item key={index} onClick={()=>{setCasino(name);context.getCasino(name)}}>{name}</Dropdown.Item>))}
                                </DropdownButton>
                            </Col>
                        </Row>
                    </section>

                    {/*User will choose a incident type from a dropdown box */}
                    <section>           
                        <Row>
                            <Col>
                                <DropdownButton size="lg" id="showIncidentTypes" title={type} variant="success">
                                    {incidentTypes.map((type, index) =>(<Dropdown.Item key={index} onClick={()=>{setType(type);context.getIncidentType(type)}}>{type}</Dropdown.Item>))}
                                </DropdownButton>
                            </Col>
                        </Row>
                    </section>

                    {/*Submit Button to create incident and transfer user to active cases page */}
                    <Row><Col><SubmitButton /></Col></Row> 

                    {/*Action buttons, Log out and View Cases */} 
                    <section>
                    <Row>
                        <Col><ActionButton buttonColor="danger" title="Log Out" submit={context.logOut} /></Col>
                        <Col><ActionButton buttonColor="warning" title="View Cases" /></Col>
                    </Row> 
                    </section>                                
                </Container>
            }
        </IncidentReport.Consumer>
    );
}