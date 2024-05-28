import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
  const [formData, setFormData] = useState({

    username: '',
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // State to hold error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(''); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:3001/users', formData);
      console.log(response.data);
      document.cookie = `username=${formData.username}; path=/`;
      navigate('/');
      setFormData({
        username: '',
      const response = await axios.post('http://localhost:3001/signup', formData);
      console.log(response.data); // Log success message or response data
      // Set cookie
      document.cookie = `username=${formData.email};`;
      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      // Display success message
      alert('User signed up successfully!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('User already exists');
      } else {
        console.error('Error submitting form:', error.response?.data?.error || error.message);
      }
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
        <h2>Sign Up</h2>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
