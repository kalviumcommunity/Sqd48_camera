import React, { useState, useEffect } from 'react';
import './Landingpage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Landingpage = () => {
  const [cameras, setCameras] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [budget, setBudget] = useState(500000);
  const navigate = useNavigate();

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const filterCamerasByBudgetAndBrand = (cameras, budget, searchTerm) => {
    return cameras
      .sort((a, b) => b.price - a.price) // Sort cameras by price in descending order
      .filter((camera) => camera.price <= budget)
      .filter((camera) =>
        camera.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const handleShowSellForm = () => {
    navigate('/sell');
  };

  return (
    <div className="landing-page">
      <div className="header">
        <div className="logo">
          <h1>Camera Project</h1>
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by brand..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </li>
            <li>
              <div className="budget-slider">
                <div className="budget-label">Budget: INR. {budget}</div>
                <input
                  type="range"
                  id="budget-range"
                  min="30000"
                  max="500000"
                  value={budget}
                  onChange={handleBudgetChange}
                />
              </div>
            </li>
            <li>
              <Link to="/signup" className="login-btn signup-btn"> {/* Added signup-btn class */}
                Sign Up/Login
              </Link>
            </li>
            <li>
              <button className="sell-btn" onClick={handleShowSellForm}>
                Sell
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="content">
        <>
          <h2>Welcome to the Camera Project</h2>
          <p>Explore our collection of high-quality cameras and accessories.</p>
          <div className="cameras-container">
            <div className="row">
              {filterCamerasByBudgetAndBrand(cameras, budget, searchTerm).map(
                (camera, index) => (
                  <div key={index} className="column">
                    <div className="camera-item">
                      <img src={camera.imgurl} alt={camera.name} />
                      <div className="camera-details">
                        <strong><p className="camera-model">{camera.name}</p></strong>
                        <strong><p className="camera-price">INR. {camera.price}</p></strong>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      </div>

      <footer>
        <p>&copy; 2023 Camera Project</p>
      </footer>
    </div>
  );
};

export default Landingpage