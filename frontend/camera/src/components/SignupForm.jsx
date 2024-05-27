import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing
import './SignupForm.css'; // Import CSS file

function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', formData);
      console.log(response.data); // Log success message or response data
      // Set cookie
      document.cookie = `username=${formData.email};`;
      // Reset form fields after successful submission
      setFormData({
        email: '',
        password: ''
      });
      // Display success message
      alert('User signed up successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error as needed
    }
  };
  
  // Function to get the value of a cookie by name
  const getCookieValue = (name) => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : '';
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form">
        <h2>Sign in <input type="button" value="" /></h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
