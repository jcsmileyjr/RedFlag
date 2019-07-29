import React from "react";
import '../../App.css';//global stylesheet
import './footer.css';//stylesheet for this component
import {Container, Row, Col} from 'react-bootstrap';


const Footer = (props) =>(
    <Container className="fixed-bottom">
        <Row>
            <Col><span className="redTitle">Version:</span>1.0.0</Col>
        </Row>
    </Container>
);

export default Footer;
