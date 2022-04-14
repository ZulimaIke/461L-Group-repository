import React from 'react';
import { Link } from "react-router-dom";


//Home page, initial start page w/ message
const Home = () => {
	
return (
	<div>
	<h1>
		<text>
			Welcome!{"\n"}
		</text>
	</h1>
	
	<li>
		<Link to = "/createAcc">Create new account</Link>
	</li>

	<li>
		<Link to = "/login">Sign into existing account</Link>
	</li>

	<img className = "image1" src='jazz.jpg' width="500" height = "600"/>
	</div>
);
};

export default Home;
