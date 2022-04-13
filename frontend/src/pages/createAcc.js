import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./createAcc.css";
import { Link } from "react-router-dom";

export default function CreateAcc() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createdAcc, setCreatedAcc] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div align="center" className="Login">
    <h1>Create a new account : </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}
         onClick={() => {
                    fetch("http://127.0.0.1:5000/create_acc/" + username + "_" + password)
                        .then(response => 
                            response.json()
                        )
                        .then(data => {
                            setCreatedAcc(data.createdAcc)
			    console.log(createdAcc)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        }}
        >
          Create Account
        </Button>
      </Form>
    </div>
  );
}