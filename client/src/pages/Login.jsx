import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:8000/login', { email, password });
      console.log(result);
      // Assuming the server sends a specific message or status on successful login
      if (result.data.message === 'You are now logged in!') {
        navigate('/profile');
      } else {
        // Handle login failure
        console.error('Login failed:', result.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error);
    }
  };

  return (
    <>
    <Navbar />

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-3">Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
     </>
  );
};

export default Login;
