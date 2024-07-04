// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyAppBar from './AppBar';
import Dashboard from './Dashboard';
import About from './About';
import Login from './Login';
import Signup from './Signup';// Import the Signup component
import Home from './Home'; 
import AItools from './AItools'; // Import the AItools component
import FavoriteTools from './FavoriteTools'; // Import the FavoriteTools component
import RecentlyUsed from './RecentlyUsed'; // Import the RecentlyUsed component
import { getHello } from './ApiService';

function App() {
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        const fetchMessage = async () => {
            try {
                const data = await getHello();
                setMessage(data);
            } catch (error) {
                console.error('Error fetching message', error);
            }
        };

        fetchMessage();
    }, []);

    return (
        <Router>
            <MyAppBar />
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard message={message} />} />
                    <Route path="/dashboard/home" element={<Home />} />
                    <Route path="/dashboard/ai-tools" element={<AItools />} />
                    <Route path="/dashboard/favorite-tools" element={<FavoriteTools />} />
                    <Route path="/dashboard/recently-used" element={<RecentlyUsed />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
