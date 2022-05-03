import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const axios = require("axios").default;

export default function Login() {
  const [loginSuccess, setLoginSuccess] = useState("");
  const navigateTo = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginFail, setLoginFail] = useState(false);
  const[failMessage, setFailMessage] = useState();

  const handleUser = (e) => {
    setUsername(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //no login fail
    setLoginFail(false);
    //Check for fail if missing username/password
    if(!username){
      setLoginFail(true);
      setFailMessage("Please input username");
      return;
    } else if(!password){
      setLoginFail(true);
      setFailMessage("Please input password");
      return;
    }
    
    axios.post("http://localhost:5000/user/login/", {
      data: {
        username: username,
        password: password,
      },
    })
    .then(function (response) {
      let requestResponse = response.data;
      console.log(requestResponse);
      if(requestResponse === "invalid username"){
        setLoginFail(true);
        setFailMessage("Invalid username");
      } else if(requestResponse === "invalid password"){
        setLoginFail(true);
        setFailMessage("Invalid password");
      } else {
        navigateTo('/postLogin');

      }
    })
    .catch(function (error) {
      console.log(error);
    });

  };


  return (
    <div align="center" className="Login">
    <h1>Sign into an existing account</h1>
      <Form onSubmit={handleSubmit}>
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
          Login
        </Button>

        <li>
          <Link to = "/">Back</Link>
        </li>
        <li>
          <Link to = "/createAcc">New? Create an account</Link>
        </li>
      </Form>
      <h1>{failMessage}</h1>
    </div>
  );
}