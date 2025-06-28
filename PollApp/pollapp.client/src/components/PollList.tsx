import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Define TypeScript interfaces for the data structure
interface PollOption {
  id: number;
  text: string;
  votes: number;
  pollID: number;
}

interface Poll {
  id: number;
  question: string;
  createdAt: string;
  options: PollOption[];
}

function PollList() {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/poll');
                if (!response.ok) {
                    throw new Error('Failed to fetch polls');
                }
                const data: Poll[] = await response.json();
                setPolls(data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (polls.length === 0) {
        return (
            <div>
                <h1>Polls</h1>
                <p>No polls available</p>
                <Link to="/create" className="btn btn-primary mb-3">Create New Poll</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Polls</h1>
            <Link to="/create" className="btn btn-primary mb-3">Create New Poll</Link>
            <div className="list-group">
                {polls.map(poll => (
                    <Link 
                        key={poll.id} 
                        to={`/poll/${poll.id}`} 
                        className="list-group-item list-group-item-action"
                    >
                        <h5>{poll.question}</h5>
                        <small className="text-muted">
                            Created: {new Date(poll.createdAt).toLocaleString()}
                        </small>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PollList;