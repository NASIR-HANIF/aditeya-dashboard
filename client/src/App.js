import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css'; 

// Components
import Home from "./compunent/Home/Home";
import Contact from "./compunent/Contact/Contact";
import About from "./compunent/About/About";
import Navbar from "./compunent/Navbar/Navbar"
import Dashboard from './compunent/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
      
        <Navbar />
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/xyz" element={<Dashboard />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
