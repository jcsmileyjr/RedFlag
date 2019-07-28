import React from "react";
import '../../App.css';
import {Container, Row, Col} from 'react-bootstrap';

import Nav from '../../components/Nav/Nav';
import {GetReports} from '../Incident/IncidentData';

export default function Reports(props) {
    const reports = GetReports();
    return(
        <Container>
            {/*Nav Bar */}
            <Nav />

            {/*Page Title */}
            <Row><Col className="pageTitleStyle">Initial Incident Report</Col></Row>
            {reports.map((report, index)=>(
                <section key={index}>
                    <Row><Col>Patron Name: {report.patronName}</Col></Row>
                    <Row><Col>Casino: {report.casinoName}</Col></Row>
                    <Row><Col>Incident Type: {report.incidentType}</Col></Row>
                    <Row><Col>Days Remaining: {report.daysRemaining}</Col></Row>
                </section>
            ))

            }
        </Container>
    );
}