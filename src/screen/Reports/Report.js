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
            {reports.map((report)=>(
                <section>
                    <Row><Col>Patron Name: {report.agentName}</Col></Row>
                    <Row><Col>Patron Name: {report.casinoName}</Col></Row>
                    <Row><Col>Patron Name: {report.incidentType}</Col></Row>
                    <Row><Col>Patron Name: {report.incidentDate}</Col></Row>
                </section>
            ))

            }
        </Container>
    );
}