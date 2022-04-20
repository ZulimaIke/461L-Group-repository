import React from 'react';
import { FaBootstrap } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-native';
import { Link } from "react-router-dom";
function PostLogin() {

  const navigate = useNavigate();

  // const routeChange = () =>{ 
  //   let path = `newPath`; 
  //   history.push(path);
  // }

  return (
    <div>
      <h1>Welcome</h1>
      <li>
      <Link to = "/newProject">Create new project</Link>
      </li>
      <li>
      <Link to = "/manageProject">Manage existing project</Link>
      </li>
      <li>
      <Link to = "/joinProject">Join an existing project</Link>
      </li>
      <li>
      <Link to = "/hardwareCheckout">Checkout Hardware Sets</Link>
      </li>
      <li>
      <Link to = "/dataAccess">Access Metadata</Link>
      </li>
      <li>
      <Link to = "/">Logout</Link>
      </li>
    </div>

    // <div>
    //       <Button>hi</Button>
    // </div>

      // <div className="app flex-row align-items-center">
                 
      //   <Button color="primary" className="px-4"
      //     onClick={navigate('/about')}
      //       >
      //       Login
      //     </Button>

      // </div>
  );
}
export default PostLogin;