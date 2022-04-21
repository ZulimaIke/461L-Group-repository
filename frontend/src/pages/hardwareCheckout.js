import React, {useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { spacing } from '@mui/system';
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./login.css";
import {useTable} from 'react-table';
import { Columns } from './columns3';
//import createhardwareSet from './hardwareSets';


const HardwareCheckout = () => {

    const [hwSetName,setHWSetName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [username, setUsername] = useState("");
    const [dataOutput, setDataOutput] = useState("");
    const [successfullyCreated, setSuccessfullyCreated] = useState("");

    const [user_data, setUserData] = useState([]);
    const columns = useMemo(() => Columns, [])

    const tableInstance = useTable({
        columns: columns,
        data: user_data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow 
    } = tableInstance

    function validateEntry() {
        return hwSetName.length > 0 && quantity.length > 0;
    }

  function userMessage(flag) {
    alert(flag);
  }

    useEffect(() => {
      fetch("/getHW/")
                        .then(response => 
                            response.json()
                        )
                        .then(data => {
                            setUserData(JSON.parse(data.user_data))
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        })
	
    return (
        <div align= "center" className='Login'> 
        <table {... getTableProps}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                    ))
                }
                
            </thead>
            <tbody {...getTableBodyProps}>
                { rows.map(row => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        { row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>  
                        })}
                    </tr>
                    )
                })}                
            </tbody>
        </table>
         
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
        <Form.Group size="lg" controlId="username">
          <Form.Label>project ID</Form.Label>
          <Form.Control
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>        
<Button type="button" disabled={!validateEntry}
        onClick={() => {
                    fetch("/checkout/" + hwSetName + "_" + quantity + "_" + username)
                        .then(response => 
                            response.json()
                        )
                        .then(data => {
			    userMessage(data.successfullyCreated);                                			    setSuccessfullyCreated(data.successfullyCreated);   
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        }}
        >
            Check Out
        </Button>       
<Button type="button" disabled={!validateEntry}
        onClick={() => {
                    fetch("/checkin/" + hwSetName + "_" + quantity + "_" + username)
                        .then(response => 
                            response.json()
                        )
                        .then(data => {
			    userMessage(data.successfullyCreated);                                			    setSuccessfullyCreated(data.successfullyCreated);   
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        }}
        >
            Check In
        </Button>
	<li>
          <Link to = "/postLogin">Back</Link>
        </li>
        </Form>
        </div>

    
    );
    };
    
export default HardwareCheckout;
