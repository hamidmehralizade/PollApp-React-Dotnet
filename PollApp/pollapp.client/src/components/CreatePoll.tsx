import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PollOption {
    text: string;
    votes?: number;
}

interface PollData {
    question: string;
    options: PollOption[];
}

const CreatePoll: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['', '']);
    const navigate = useNavigate();

    const handleOptionChange = (index: number, value: string): void => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = (): void => {
        setOptions([...options, '']);
    };

    const removeOption = (index: number): void => {
        if (options.length <= 2) return;
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const pollData: PollData = {
            question,
            options: options.map(opt => ({ text: opt, votes: 0 }))
        };

        try {
            const response = await fetch('/api/poll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pollData),
            });

            if (response.ok) {
                navigate('/');
            } else {
                throw new Error('Failed to create poll');
            }
        } catch (error) {
            console.error('Error creating poll:', error);
            alert('Failed to create poll. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h1>Create New Poll</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="question" className="form-label">Question</label>
                    <input
                        id="question"
                        type="text"
                        className="form-control"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>

                <h5 className="mt-4">Options</h5>
                {options.map((option, index) => (
                    <div key={index} className="form-group mb-3 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                            placeholder={`Option ${index + 1}`}
                        />
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeOption(index)}
                            disabled={options.length <= 2}
                            aria-label={`Remove option ${index + 1}`}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="d-flex gap-2 mb-4">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={addOption}
                    >
                        Add Option
                    </button>

                    <button type="submit" className="btn btn-primary">
                        Create Poll
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePoll;