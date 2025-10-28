import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AccommodationDetail from './pages/AccommodationDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/accommodation/:id" element={<AccommodationDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
