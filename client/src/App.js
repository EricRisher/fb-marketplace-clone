import React from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './components/pages/Home';
import Products from './components/Products';


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/products' exact component={Products} />
        </ Routes>

    </Router>
    </>
  );
}

export default App;
