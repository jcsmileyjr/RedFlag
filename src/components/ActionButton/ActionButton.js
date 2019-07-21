import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./actionButton.css"

//Special small buttons. The buttonColor is dependent on the react-bootstrap button varient type
const ActionButton = (props) => (
    <Container>
        <Row><Col><Button variant={props.buttonColor} size="sm" className="actionButtonStyle" onClick={()=>{props.submit()}}>{props.title} </Button></Col></Row>
    </Container>
);

export default ActionButton;