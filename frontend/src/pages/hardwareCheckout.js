import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { spacing } from '@mui/system';
import { Form } from 'react-bootstrap';
import "./login.css";
//import createhardwareSet from './hardwareSets';


const HardwareCheckout = () => {

    const [hwSetName,setHWSetName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [dataOutput, setDataOutput] = useState("");

    function validateEntry() {
        return hwSetName.length > 0 && quantity.length > 0;
    }

    function sendData() {
        console.log("made it");
        var dataInput = hwSetName.concat("_");
        var dataInput = dataInput.concat(quantity);              //concat string to send as one input to backend

        console.log(dataInput);
        fetch('/hwSet/' + dataInput)
        .then(res => res.json())
        .then(data => console.log(data)
        );
    }
	
    return (
        <div align= "center" className='Login'>          
        <Form>
        <Form.Group size="lg" controlId="hwSetName">
          <Form.Label>Set Name</Form.Label>
          <Form.Control
            autoFocus
            type="hwSetName"
            value={hwSetName}
            onChange={(e) => setHWSetName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        <Button type="button" disabled={!validateEntry} onClick={sendData}>
            Create New Set
        </Button>
        </Form>
        </div>

    
    );
    };
    
export default HardwareCheckout;