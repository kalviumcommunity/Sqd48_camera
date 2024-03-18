// Landingpage.jsx
import React, { useState } from 'react';
import './Landingpage.css';

const Landingpage = () => {
  const [budget, setBudget] = useState(5000);

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
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
                  <div className="budget-label">Budget: ${budget}</div>
                  <input
                    type="range"
                    id="budget-range"
                    min="1000"
                    max="10000"
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
      </div>

      <footer>
        {/*footer component*/}
        <p>&copy; 2023 Camera Project</p>
      </footer>
    </div>
  );
};

export default Landingpage;