import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate();
    return <div>
        <h1>Home</h1>
        <button onClick={() => navigate('/login')}>
            login 
        </button>
        <button onClick={() => navigate('/signup')}>
            go to signup
        </button>

    </div>
}

export default Home;