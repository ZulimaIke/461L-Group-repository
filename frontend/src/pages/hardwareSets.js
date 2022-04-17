import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export const createhardwareSet = () => {

    const [hwName, setHwName] = useState("");
    const [quantity, setQuantity] = useState("");


    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'stretch',
            height: '100vh'
        }}
        >
        <h1>
            <text>
                Please kill me{"\n"}
            </text>
        </h1>
        
        </div>

        



    );

}


export default createhardwareSet;