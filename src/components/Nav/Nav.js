import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "./nav.css"//stylesheet for this component
import '../../App.css';//global stylesheet

const Nav = (props) => (
    <Container className="center">
        <Row>
            <Col className="navTitleStyle"><span className="redTitle">Red</span>Flag</Col>   
        </Row>
    </Container>
);

export default Nav;