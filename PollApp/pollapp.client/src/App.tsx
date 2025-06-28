import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PollList from './components/PollList';
import CreatePoll from './components/CreatePoll';
import PollDetail from './components/PollDetail';
import './custom.css';

// Define the main App component with TypeScript
const App: React.FC = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<PollList />} />
                <Route path="/create" element={<CreatePoll />} />
                <Route path="/poll/:id" element={<PollDetail />} />
            </Routes>
        </Layout>
    );
};

export default App;