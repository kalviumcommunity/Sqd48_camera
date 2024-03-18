import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import Landingpage from './components/Landingpage';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Landingpage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App; 