import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './login'; // This should now correctly point to the login.js file
import Dashboard from './dashboard';
import InteractiveMap from './interactive-map';
import Home from './index'; // Home page should point here

function MyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interactive-map" element={<InteractiveMap />} />
      </Routes>
    </Router>
  );
}

export default MyApp;
