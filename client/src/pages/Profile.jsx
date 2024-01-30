import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', {
                withCredentials: true // Include session cookie in the request
            });
            setUserData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    fetchUserData();
}, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong...</p>;
    console.log(error)
    if (!userData) return <p>No user data found.</p>;

    const listedItems = []; // This should be populated with real data
    const favorites = []; // This should be populated with real data

  return (
    <>
    <Navbar />
    <div className="container profile-container my-5">
      <div className="row align-items-center mb-4">
        <div className="col-auto">
          <div className="user-avatar"></div>
        </div>
        <div className="col">
          <h2 className="username">{userData.username}</h2>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <h3>Listed Items:</h3>
        </div>
        {listedItems.map((item, index) => (
          <div className="col-md-4 col-sm-6 mb-3" key={`listed-item-${index}`}>
            <div className="card h-100"></div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <h3>Favorites:</h3>
        </div>
        {favorites.map((item, index) => (
          <div className="col-md-4 col-sm-6 mb-3" key={`favorite-item-${index}`}>
            <div className="card h-100"></div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Profile