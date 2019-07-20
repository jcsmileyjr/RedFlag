import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "./nav.css"
const Nav = (props) => (
    <Container>
        <Row>
            <Col className="navTitleStyle"><span className="redTitle">Red</span>Flag</Col>   
        </Row>
    </Container>
);

export default Nav;