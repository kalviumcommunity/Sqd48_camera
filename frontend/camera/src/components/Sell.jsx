import React, { useState, useEffect } from 'react';
import './Sell.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sell = () => {
  const [sellItems, setSellItems] = useState([]);

  useEffect(() => {
    fetchSellCameras();
  }, []);

  const fetchSellCameras = async () => {
    try {
      const response = await axios.get('http://localhost:3001/sell-cameras');
      if (response.status !== 200) {
        throw new Error('Failed to fetch sell cameras');
      }
      setSellItems(response.data);
    } catch (error) {
      console.error('Error fetching sell cameras:', error);
    }
  };

  const handleRemove = async (cameraId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/sell-cameras/${cameraId}`);
      if (response.status === 200) {
        console.log('Camera removed successfully');
        fetchSellCameras();
      } else {
        console.error('Failed to remove camera');
      }
    } catch (error) {
      console.error('Error removing camera:', error);
    }
  };

  const handleUpdate = async (cameraId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3001/sell-cameras/${cameraId}`, updatedData);

      if (response.status === 200) {
        console.log('Camera updated successfully');
        fetchSellCameras();
      } else {
        console.error('Failed to update camera');
      }
    } catch (error) {
      console.error('Error updating camera:', error);
    }
  };

  const handleUpdateSubmit = (cameraId, updatedData) => {
    handleUpdate(cameraId, updatedData);
  };

  // Update Form Component
  const UpdateForm = ({ camera, handleUpdateSubmit }) => {
    const [updatedData, setUpdatedData] = useState({ name: camera.name, price: camera.price, imgurl: camera.imgurl });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleUpdateSubmit(camera._id, updatedData);
    };

    return (
      <div className="update-form">
        <form onSubmit={handleSubmit} className="update-form-fields">
          <div>
            <input type="text" name="name" value={updatedData.name} onChange={handleChange} />
          </div>
          <div>
            <input type="text" name="price" value={updatedData.price} onChange={handleChange} />
          </div>
          <div>
            <input type="text" name="imgurl" value={updatedData.imgurl} onChange={handleChange} />
          </div>
          <div className="camera-buttons">
            <button type="submit">Update</button>
            <button onClick={() => handleRemove(camera._id)}>Remove</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="sell-page">
      <div className="header">
        <div className="logo">
          <h1>Camera Project</h1>
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/sellform" className="add-btn">
                Add
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="content">
        <h2>Your Sell Items</h2>
        {sellItems && sellItems.length === 0 ? (
          <p>Your sell list is empty.</p>
        ) : (
          <div className="cameras-container">
            <div className="row">
              {sellItems.map((camera, index) => (
                <div key={index} className="column">
                  <div className="camera-item">
                    <img src={camera.imgurl} alt={camera.name} />
                    <div className="camera-details">
                      <div className="camera-details-text">
                        <p className="camera-model">{camera.name}</p>
                        <p className="camera-price">INR. {camera.price}</p>
                      </div>
                      <UpdateForm camera={camera} handleUpdateSubmit={handleUpdateSubmit} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer>
        <p>&copy; 2023 Camera Project</p>
      </footer>
    </div>
  );
};

export default Sell;