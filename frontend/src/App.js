import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Login from './pages/login';
import CreateAcc from './pages/createAcc';
import Navbar from './component_navbar/index';


//Routing containing paths to directory containing pages and corresponding elements
function App() {
return (
	<Router>
    <Navbar/>
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/CreateAcc' element={<CreateAcc />} />
      <Route path='/login' element={<Login />} />
    </Routes>
	</Router>
);
}

export default App;
