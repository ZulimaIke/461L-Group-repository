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

    function validateEntry() {
        return hwSetName.length > 0 && quantity > 0;
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
        <Button type="submit" disabled={!validateEntry}
            onClick={() => {

                //backend linkage

            }
            }
        
        >
            Create New Set
        </Button>
        <Button 
            onClick={() => {
                //backend linkage
            }
            }
        >
            Browse Existing Sets
        </Button>
        </Form>
        
        </div>

    
    );
    };
    
export default HardwareCheckout;