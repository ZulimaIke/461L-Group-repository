import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./createAcc.css";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from '@hookform/error-message';

const axios = require("axios").default;
export default function CreateAcc() {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createdAcc, setCreatedAcc] = useState("");
  const [createFail, setCreateFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const handleUser = (e) => {
    setUsername(e.target.value);
  };  
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreateFail(false);
    if(!username){
      setCreateFail(true);
      setFailMessage("Please enter a valid username");
      return;
    } else if(!password){
      setCreateFail(true);
      setFailMessage("Please enter a valid password");
      return;
    }

    // axios.post("/user/createAcc/", {
    axios.post("/user/createAcc/", {
      data:{
        username: username,
        password: password,
      },
    })
    .then(function (response) {
      console.log(response);
      if(response.data === "user already exists"){
        setCreateFail(true);
        setFailMessage("User already exists");
      } else {
        navigateTo('/postLogin')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  return (
    <div align="center" className="Login">
    <h1>Create a new account : </h1>
      <Form>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={handleUser}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePass}
          />
        </Form.Group>
        <Button block size="lg" type="submit" 
         onClick={handleSubmit}
        >
          Create Account
        </Button>
        <li>
          <Link to = "/">Back</Link>
        </li>
        <li>
          <Link to = "/login">Login to existing account</Link>
        </li>
      </Form>
      <h2>{failMessage}</h2>
    </div>
    
  );
}