import React from "react";
import '../../App.css';
import {Container, Row, Col} from 'react-bootstrap';

import InputText from '../../components/InputText/InputText.js';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import Nav from '../../components/Nav/Nav';

export default function Login(props) {
    return(
        <Container className="center">
            <Nav redTitle ={props.redTitle} blackTitle={props.blackTitle} />
            <Row><Col className="pageTitleStyle">Log-in</Col></Row>
            <section>
            <Row><Col>User Name</Col></Row>            
            <Row><Col><InputText /></Col></Row>
            </section>
            <section>
            <Row><Col>Password</Col></Row>
            <Row><Col><InputText /></Col></Row>
            </section>
            
            <Row><Col><SubmitButton /></Col></Row>
        </Container>
    );
}