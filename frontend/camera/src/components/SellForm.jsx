// SellForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SellForm.css'; // Import sellform.css file

const SellForm = () => {
  const [price, setPrice] = useState('');
  const [modelName, setModelName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: modelName,
        imgurl: imageUrl,
        price: parseFloat(price),
      };

      const response = await axios.post('http://localhost:3001/sell-cameras', formData);

      if (response.status === 200) {
        console.log('Camera added successfully');
        setPrice('');
        setModelName('');
        setImageUrl('');
        navigate('/sell');
      } else {
        console.error('Failed to add camera');
      }
    } catch (error) {
      console.error('Error adding camera:', error);
    }
  };

  return (
    <div className="sell-form-container"> {/* Make sure to use a container class name */}
      <h2>Sell Your Camera</h2>
      <form onSubmit={handleSubmit} className="sell-form"> {/* Apply CSS class to form */}
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="modelName">Model Name:</label>
          <input
            type="text"
            id="modelName"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellForm;
