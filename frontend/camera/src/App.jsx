import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/Landingpage';
import SellForm from './components/SellForm';
import Sell from './components/Sell';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/sellform" element={<SellForm />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
      </Routes>
    </Router>
  );
}

export default App;