import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Warframe App!</h1>
      <p>Get started by clicking below:</p>
      <Link to="/login">Go to Login Page</Link>
    </div>
  );
}

export default Home;
