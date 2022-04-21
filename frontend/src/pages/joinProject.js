import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";


export default function JoinProject() {
  const [projectID, setProjectID] = useState("");
  const [successfullyCreated, setSuccessfullyCreated] = useState("");
  const navigate = useNavigate():

  function userMessage(flag) {
    alert(flag);
  }

  function redirect(flag) {
    if (flag == "Successfully joined") {
      navigate("/postLogin/");
    }
  }

  function validateForm() {
    return projectID.length > 0;
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
        <Button block size="lg" type="submit" disabled={!validateForm()}
         onClick={() => {
                    fetch("/joinProject/" + projectID)
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

