import React from "react";
import '../../App.css';
import {Container, Row, Col} from 'react-bootstrap';
import { UserLogInConsumer } from "../../App";

import InputText from '../../components/InputText/InputText.js';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import Nav from '../../components/Nav/Nav';

export default function Login(props) {


    return(
        <UserLogInConsumer>
            {context => 
        <Container className="center">
            <Nav />
            <Row><Col className="pageTitleStyle">Log-in</Col></Row>
            <section>
                <Row><Col>User Name</Col></Row>            
                <Row><Col><InputText updateState= {context.getUserName} inputType="text"  /></Col></Row>
            </section>
            <section>
                <Row><Col>Password</Col></Row>
                <Row><Col><InputText updateState= {context.getPwd} inputType="password" /></Col></Row>
            </section>            
            <Row><Col><SubmitButton submit={context.logIn}  /></Col></Row>
        </Container>
            }
        </UserLogInConsumer>
    );
}