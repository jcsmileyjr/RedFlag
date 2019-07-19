import React from "react";
import './inputText.css';
import {Container, Row, Col} from 'react-bootstrap';

const InputText = () => (
    <Container>
        <Row><Col><input className="inputStyle" type="text"/></Col></Row>
    </Container>
);

export default InputText;

