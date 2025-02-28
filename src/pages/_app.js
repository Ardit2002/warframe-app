import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './login';
import Dashboard from './dashboard';
import InteractiveMap from './interactive-map';

function MyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interactive-map" element={<InteractiveMap />} />
      </Routes>
    </Router>
  );
}

export default MyApp;
