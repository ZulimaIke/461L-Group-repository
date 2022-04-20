import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


export default function JoinProject() {
  const [projectID, setProjectID] = useState("");
  const [projectUser, setProjectUser] = useState("");
  const [successfullyCreated, setSuccessfullyCreated] = useState("");

  function userMessage(flag) {
    alert(flag);
  }

  function redirect(flag) {
    if (flag == "Successfully joined") {
      window.location.href='/postLogin';
    }
  }

  function validateForm() {
    return projectID.length > 0 && projectUser.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div align="center" className="Login">
        <h1><u>Join Existing Project</u></h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="projectID">
          <Form.Label>Project ID </Form.Label>
          <Form.Control
            type="projectID"
            value={projectID}
            onChange={(e) => setProjectID(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="projectUser">
          <Form.Label>Confirm by typing your username </Form.Label>
          <Form.Control
            type="projectUser"
            value={projectUser}
            onChange={(e) => setProjectUser(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}
         onClick={() => {
                    fetch("http://127.0.0.1:5000/joinProject/" + projectID + "_" + projectUser)
                        .then(response => 
                            response.json()
                        )
                        .then(data => {
			    userMessage(data.successfullyCreated)
                            setSuccessfullyCreated(data.successfullyCreated)
			    redirect(data.successfullyCreated)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        }}         
        >
          Join project
        </Button>

        <li>
          <Link to = "/postLogin">Cancel</Link>
      </li>
      </Form>
    </div>
  );
}

