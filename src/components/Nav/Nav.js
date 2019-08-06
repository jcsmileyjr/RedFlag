import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "./nav.css"//stylesheet for this component
import '../../App.css';//global stylesheet

const Nav = (props) => (
    <Container className="center">
        {props.menu === false && 
            <Row>
                <Col className="navTitleStyle"><span className="redTitle">Red</span>Flag</Col>   
            </Row>        
        }

        {props.menu &&
            <Row className="menu">
                <Col xs={12}>Number of Cases: {props.countOfCases}</Col>
                <Col className="legendTitlePlenty" xs={4}>Green</Col>
                <Col className="legendTitleAlmost" xs={4}>Yellow</Col>
                <Col className="legendTitleOut" xs={4}>Red</Col>
            
                <Col className="legendInfoBox" xs={4}>Plenty of time</Col>
                <Col className="legendInfoBox" xs={4}>Almost out of time</Col>
                <Col className="legendInfoBox" xs={4}>Out of time</Col>
            </Row>            
        }
    </Container>
);

export default Nav;