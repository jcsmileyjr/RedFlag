import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./submitButton.css"
const SubmitButton = (props) => (
    <Container>
        <Row><Col><Button variant="success" size="lg" className="submitButtonStyle" onClick={()=>props.submit()}>Submit</Button></Col></Row>
    </Container>
);

export default SubmitButton;