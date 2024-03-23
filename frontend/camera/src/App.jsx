import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import Landingpage from './components/Landingpage';
import SellForm from './components/SellForm';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Landingpage/>} />
        <Route path = "/sellform" element={<SellForm/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App; 