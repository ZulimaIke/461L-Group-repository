import React from 'react';
import { Link } from "react-router-dom";


//Home page, initial start page w/ message
const Logout = () => {
	
return (
	<div>
	<h1>
		<text>
			Thanks for visiting!{"\n"}
		</text>
	</h1>
	
	<li>
		<Link to = "/">Return to home</Link>
	</li>
	<img className = "image1" src='logout.jpg' width="500" height = "600"/>
	</div>
);
};

export default Logout;
