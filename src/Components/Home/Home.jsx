import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Κάνει το container να καλύπτει ολόκληρο το ύψος της οθόνης
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <h1>Home</h1>
      <button style={buttonStyle} onClick={() => navigate('/login')}>
        Login
      </button>
      <button style={buttonStyle} onClick={() => navigate('/signup')}>
        Go to Signup
      </button>
    </div>
  );
};

export default Home;
