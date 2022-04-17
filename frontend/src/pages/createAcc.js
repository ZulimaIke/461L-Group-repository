import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./createAcc.css";
import { Link } from "react-router-dom";

const axios = require("axios").default;


export default function CreateAcc() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createdAcc, setCreatedAcc] = useState("");
  const [createFail, setCreateFail] = useState(false);
  const[failMessage, setFailMessage] = useState("");

  const handleUser = (e) => {
    setUsername(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(event) {
    createFail(false);
    if(!username){
      createFail(true);
      setFailMessage("Please enter a valid username");
      return;
    } 

    axios.post("/user/createAcc", {
      data:{
        username: username,
        password: password,
      },
    })
    .then(function (response) {
      console.log(response);
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
        <Button block size="lg" type="submit" onClick={handleSubmit}>
          Create Account
        </Button>
        <li>
          <Link to = "/">Back</Link>
        </li>
        <li>
          <Link to = "/login">Login to existing account</Link>
        </li>
        <h3>{failMessage}</h3>
      </Form>
    </div>
  );
}