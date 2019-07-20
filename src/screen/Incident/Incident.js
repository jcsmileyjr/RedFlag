import React, { useState } from "react";
import '../../App.css';
import {Container, Row, Col, DropdownButton, Dropdown} from 'react-bootstrap';

import Nav from '../../components/Nav/Nav';
import InputText from '../../components/InputText/InputText';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

//names of the current casinos in Tunica
const casinoNames = ["GoldStrike", "Horseshoe", "1st Jackpot", "Sam's Town", "Hollywood", "Fitz", "Isle of Capri"];

//Screen that allows the user to create a initial incident report
export default function Incident(props) {
    const [casino, setCasino] = useState("Casino Name");//react hook to update dropdown button title
    
    return(
        <Container className="center">
            {/*Nav Bar */}
            <Nav redTitle ={props.redTitle} blackTitle={props.blackTitle} />

            {/*Page Title */}
            <Row><Col className="pageTitleStyle">Initial Incident Report</Col></Row>

            {/*User will input Patron/Suspect Name */}
            <section>
                <Row><Col>Patron Name</Col></Row>            
                <Row><Col><InputText /></Col></Row>
            </section>

            {/*User will choose a casino from a dropdown box */}
            <section>           
                <Row>
                    <Col>
                        <DropdownButton size="lg" id="showCasinoNames" title={casino} variant="success">
                            {casinoNames.map((name, index) =>(<Dropdown.Item key={index} onClick={()=>setCasino(name)}>{name}</Dropdown.Item>))}
                        </DropdownButton>
                    </Col>
                </Row>
            </section>

            {/*User will choose a incident type from a dropdown box */}
            <section>
                <Row><Col>Incident Type</Col></Row>            
                <Row><Col></Col></Row>
            </section> 

            {/*Submit Button to create incident and transfer user to active cases page */}
            <Row><Col><SubmitButton /></Col></Row>                                   
        </Container>
    );
}