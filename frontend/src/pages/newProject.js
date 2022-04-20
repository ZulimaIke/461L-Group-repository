import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./createAcc.css";
import { Link } from "react-router-dom";
import "./newProject.css";


export default function NewProject() {
  const [projectName, setProjectName] = useState("");
  const [projectID, setProjectID] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUser, setProjectUser] = useState("");
  const [successfullyCreated, setSuccessfullyCreated] = useState("");

  function userMessage(flag) {
    if(flag == "true") {
      alert("Successfully created new project");
    } else {
      alert("error");
    }
  }

  function redirect(flag) {
    if (flag == "true") {
      window.location.href='/postLogin';
    }
  }
  function validateForm() {
    return projectName.length > 0 && projectID.length > 0 && projectDescription.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div align="center" className="Login">
        <h1><u>Create a New Project</u></h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="projectName">
          <Form.Label>Project Name </Form.Label>
          <Form.Control
            autoFocus
            type="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="projectID">
          <Form.Label>Project ID </Form.Label>
          <Form.Control
            type="projectID"
            value={projectID}
            onChange={(e) => setProjectID(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="projectDescription">
          <Form.Label>Project Description </Form.Label>
          <Form.Control
            type="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="projectUser">
          <Form.Label>Confirm by typing username </Form.Label>
          <Form.Control
            type="projectUser"
            value={projectUser}
            onChange={(e) => setProjectUser(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}
         onClick={() => {
                    fetch("http://127.0.0.1:5000/newProject/" + projectName + "_" + projectID + "_" + projectDescription + "_" + projectUser)
                        .then(response => 
                            response.json()
                        )
                        .then(data => {
			    userMessage(data.successfullyCreated)
                            setSuccessfullyCreated(data.successfullyCreated)
			    redirect(data.successfullyCreated)
			    console.log(successfullyCreated)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        }}         
        >
          Create project
        </Button>

        <li>
          <Link to = "/postLogin">Cancel</Link>
      </li>
      </Form>
    </div>
  );
}

