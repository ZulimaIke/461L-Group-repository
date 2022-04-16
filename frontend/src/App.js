import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import HardwareCheckout from './pages/hardwareCheckout';
import Login from './pages/login';
import CreateAcc from './pages/createAcc';
import PostLogin from './pages/postLogin';
import NewProject from './pages/newProject';
import ManageProject from './pages/manageProject.js';
import Logout from './pages/logout'
import Navbar from './component_navbar/index';


//Routing containing paths to directory containing pages and corresponding elements
function App() {
return (
	<Router>
    <Navbar/>
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/hardwareCheckout' element={<HardwareCheckout />} />
      <Route path='/CreateAcc' element={<CreateAcc />} />
      <Route path='/login' element={<Login />} />
      <Route path='/postLogin' element={<PostLogin />} />
      <Route path='/newProject' element={<NewProject />} />
      <Route path='/manageProject' element={<ManageProject />} />
      <Route path='/logout' element={<Logout />} />

    </Routes>
	</Router>
);
}

export default App;
