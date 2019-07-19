import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "./nav.css"
const Nav = (props) => (
    <Container>
        <Row>
            <Col className="navTitleStyle"><span className="redTitle">{props.redTitle}</span>{props.blackTitle}</Col>   
        </Row>
    </Container>
);

export default Nav;