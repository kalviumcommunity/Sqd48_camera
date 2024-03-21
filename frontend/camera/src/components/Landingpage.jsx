import React, { useState, useEffect } from 'react';
import './Landingpage.css';
import axios from 'axios';

const Landingpage = () => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cameras');
      if (response.status !== 200) {
        throw new Error('Failed to fetch cameras');
      }
      setCameras(response.data);
    } catch (error) {
      console.error('Error fetching cameras:', error);
    }
  };

  const [budget, setBudget] = useState(30000);

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const filterCamerasByBudget = (cameras, budget) => {
    return cameras.filter((camera) => camera.price <= budget);
  };

  return (
    <div className="landing-page">
      <div className="header">
        <div className="logo">
          {/*logo image*/}
          <h1>Camera Project</h1>
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <div className="budget-slider-container">
                <div className="budget-slider">
                  <div className="budget-label">Budget: INR. {budget}</div>
                  <input
                    type="range"
                    id="budget-range"
                    min="30000"
                    max="300000"
                    value={budget}
                    onChange={handleBudgetChange}
                  />
                </div>
              </div>
            </li>
            <li>
              <button className="favorite-btn">
                <i className="fas fa-heart"></i>
                Favorites
              </button>
            </li>
            <li>
              <button className="cart-btn">
                <i className="fas fa-shopping-cart"></i>
                Cart
              </button>
            </li>
            <li>
              <button className="login-btn">Sign Up/Login</button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="content">
        {/*main content*/}
        <h2>Welcome to the Camera Project</h2>
        <p>Explore our collection of high-quality cameras and accessories.</p>
        <div className="cameras-container">
          <div className="row">
            {filterCamerasByBudget(cameras, budget).map((camera, index) => (
              <div key={index} className="column">
                <div className="camera-item">
                  <p className="camera-model">{camera.name}</p>
                  <p className="camera-price">INR. {camera.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer>
        {/*footer component*/}
        <p>&copy; 2023 Camera Project</p>
      </footer>
    </div>
  );
};

export default Landingpage;