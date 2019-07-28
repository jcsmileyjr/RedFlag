import React from "react";
import '../../App.css';//global stylesheet
import './report.css';//stylesheet for this component
import {Container, Row, Col} from 'react-bootstrap';
import {ReportState} from '../../App';//Context state transferring shared state and funtionality
import {GetReports} from '../Incident/IncidentData';//Method to get incidents from database

import Nav from '../../components/Nav/Nav';
import ActionButton from '../../components/ActionButton/ActionButton';



export default function Reports(props) {
    const reports = GetReports();
    return(
        <ReportState.Consumer>
            {context => 
                <Container>
                    {/*Nav Bar */}
                    <Nav />

                    {/*Page Title */}
                    <Row className="center"><Col className="pageTitleStyle">Initial Incident Report</Col></Row>
                    {reports.map((report, index)=>(
                        <section className="reportStyle" key={index}>
                            <Row>
                                <Col className="lineTitle">Patron Name:</Col>
                                <Col>{report.patronName}</Col>
                            </Row>
                            <Row>
                                <Col className="lineTitle">Casino:</Col>
                                <Col>{report.casinoName}</Col>
                            </Row>
                            <Row>
                                <Col className="lineTitle">Incident Type:</Col>
                                <Col>{report.incidentType}</Col>
                            </Row>
                            <Row>
                                <Col className="lineTitle">Days Remaining:</Col>
                                <Col>{report.daysRemaining}</Col>
                            </Row>
                        </section>
                    ))
                    }

                    {/*Action buttons, Log out and View Cases */} 
                    <section className="center">
                        <ActionButton buttonColor="warning" title="New Incident" submit={context.newIncident} />
                    </section>

                    <section className="center">
                        <ActionButton buttonColor="danger" title="Log Out" submit={context.logOut} />
                    </section>
                    
                </Container>
            }
        </ReportState.Consumer>
    );
}