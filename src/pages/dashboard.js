import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const goToMap = () => {
    navigate('/interactive-map');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={goToMap}>Go to Interactive Map</button>
    </div>
  );
}

export default Dashboard;
