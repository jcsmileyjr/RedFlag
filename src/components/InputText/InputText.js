import React from "react";
import './inputText.css';
import {Container, Row, Col} from 'react-bootstrap';

const InputText = (props) => (
    <Container>
        <Row><Col><input className="inputStyle" type={props.inputType} onChange={(event)=>{props.updateState(event.target.value)}} /><p></p></Col></Row>
    </Container>      
);

export default InputText;

