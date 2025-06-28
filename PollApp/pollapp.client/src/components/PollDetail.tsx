import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartData,
    type ChartOptions
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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

const PollDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [poll, setPoll] = useState<Poll | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await fetch(`/api/poll/${id}`);
                if (!response.ok) {
                    throw new Error('Poll not found');
                }
                const data: Poll = await response.json();
                setPoll(data);

                // Check if user has voted
                const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
                setHasVoted(votedPolls.includes(id));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch poll');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchPoll();
    }, [id, navigate]);

    const handleVote = async (): Promise<void> => {
        if (!selectedOption || !poll) return;

        try {
            const response = await fetch(`/api/poll/${id}/Vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ optionId: selectedOption }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit vote');
            }

            // Update local state
            const updatedPoll = { ...poll };
            const option = updatedPoll.options.find(opt => opt.id === selectedOption);
            if (option) {
                option.votes++;
            }
            setPoll(updatedPoll);

            // Mark as voted in localStorage
            const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
            votedPolls.push(id);
            localStorage.setItem('votedPolls', JSON.stringify(votedPolls));

            setHasVoted(true);
            setShowResults(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit vote');
        }
    };

    const getChartData = (): ChartData<'bar'> => {
        if (!poll) return { labels: [], datasets: [] };

        return {
            labels: poll.options.map(opt => opt.text),
            datasets: [
                {
                    label: 'Votes',
                    data: poll.options.map(opt => opt.votes),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: poll?.question,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger">{error}</div>;
    }

    if (!poll) {
        return <div className="container mt-4">Poll not found</div>;
    }

    return (
        <div className="container mt-4">
            <h1>{poll.question}</h1>
            <p className="text-muted">Created: {new Date(poll.createdAt).toLocaleString()}</p>

            {!hasVoted && !showResults && (
                <div className="mt-4">
                    <h4>Select your answer:</h4>
                    <div className="list-group mb-3">
                        {poll.options.map(option => (
                            <button
                                key={option.id}
                                className={`list-group-item list-group-item-action ${selectedOption === option.id ? 'active' : ''}`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={handleVote}
                            disabled={!selectedOption}
                        >
                            Submit Vote
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setShowResults(true)}
                        >
                            View Results
                        </button>
                    </div>
                </div>
            )}

            {(showResults || hasVoted) && (
                <div className="mt-4">
                    <h4>Results:</h4>
                    <div style={{ height: '400px' }} className="mb-4">
                        <Bar data={getChartData()} options={chartOptions} />
                    </div>

                    <div className="mt-4">
                        <h5>Share this poll:</h5>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={`${window.location.origin}/poll/${id}`}
                                readOnly
                            />
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/poll/${id}`);
                                    alert('Link copied to clipboard!');
                                }}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PollDetail;