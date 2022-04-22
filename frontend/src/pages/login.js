import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const navigate = useNavigate();

  function userMessage(flag) {
    if (flag == "true") {
      alert("Login Successful");
    }
    else {
      alert("Invalid username/password");
    }
  }

  function redirect(flag) {
    if (flag == "true") {
      navigate("/postLogin/");
    }
  }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

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
                    fetch("/login/" + username + "!" + password)
                        .then(response => 
                            response.json()
                        )
                        .then(data => {
                            console.log(data)
                            setLoginSuccess(data.loginSuccess)
                            userMessage(data.loginSuccess)
                            redirect(data.loginSuccess)
                        })
			//.then(userMessage(loginSuccess))
                        //.then(redirect(loginSuccess))
                        .catch(error => {
                            console.log(error)
                        })
                        }}
        >
          Login
        </Button>

        <li>
          <Link to = "/">Back</Link>
        </li>
      </Form>
    </div>
  );
}