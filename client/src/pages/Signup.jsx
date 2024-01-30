import React, { useState } from 'react';
import Navbar from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:8000/signup', { name, email, password}).then((result) => {
        console.log(result)
  
        if (result.data === 'success') {
          navigate('/profile');
        }
      });
    } catch (error) {
      
    }
  };

   return (
    <>
    <Navbar />
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-3">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email" 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
