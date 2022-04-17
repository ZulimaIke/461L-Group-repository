import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { spacing } from '@mui/system';
import { Form } from 'react-bootstrap';
import "./login.css";
import {Link} from "react-router-dom";
//import createhardwareSet from './hardwareSets';


const HardwareCheckout = () => {

    const [hwSetName,setHWSetName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [dataOutput, setDataOutput] = useState("");

    //enables/disables button presses until valid text field is made
    function validateEntry() {
        return hwSetName.length > 0 && quantity.length > 0;
    }

    //function to create a new hardware set and store it in MongoDB
    function sendData() {
      if(Number.isNaN(quantity)){
        alert("Invalid Quantity. Please Enter a Number");
        return
      }
      else{
        var dataInput = hwSetName.concat("_");
        var dataInput = dataInput.concat(quantity);              //concat string to send as one input to backend

        fetch('http://localhost:5000/hwSet/' + dataInput)
        .then(res => res.json())
        .then(data => console.log(data.hwsetdata)
        );
        alert("New Set Created :)");
      }
    }

    function dataFetch(){
      fetch('http://localhost:5000/getSets')
      .then(res => res.json())
      .then(data => console.log(data.hwsetdata))
      .then(data => setDataOutput(data)
      );
    }
	
    return (
        <div align= "center" className='Login'>       
        <Link to="/HWSets"><Button type="button">
            See Existing Sets
        </Button> 
        </Link>  
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