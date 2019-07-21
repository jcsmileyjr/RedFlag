import React from "react";
import '../../App.css';
import {Container, Row, Col} from 'react-bootstrap';
import { UserLogInConsumer } from "../../App";//Context api exported in to pass methods to input and submit elements.

import InputText from '../../components/InputText/InputText.js';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import Nav from '../../components/Nav/Nav';

//Login page that checks the user-name and password when the submit button is pressed 
export default function Login(props) {
    return(
        //Use a Context api exported from App.js to update state with methods
        <UserLogInConsumer>
            {context => 
                <Container className="center">
                    <Nav />
                    <Row><Col className="pageTitleStyle">Log-in</Col></Row>

                    {/*Allow user to input a user name*/}
                    <section>
                        <Row><Col>User Name</Col></Row>            
                        <Row><Col><InputText updateState= {context.getUserName} inputType="text"  /></Col></Row>
                    </section>

                    {/*Allow user to input a hidden password*/}
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