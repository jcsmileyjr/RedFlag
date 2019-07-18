import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';

export default function Login(props) {
    return(
        <Container>
            <Row><Col>Log-in</Col></Row>
            <Row><Col>User Name</Col></Row>
            <Row><Col><input type="text"/></Col></Row>
            <Row><Col>Password</Col></Row>
            <Row><Col><input type="text"/></Col></Row>
            <Row><Col><Button>Submit</Button> </Col></Row>
        </Container>
    );
}