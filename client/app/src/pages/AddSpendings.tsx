import React, { useState } from 'react';
import { postSpendings } from '../services/apipost'; 

const AddSpending: React.FC = () => {
    const [userid, setUserId] = useState<number | undefined>();
    const [count, setCount] = useState<number | undefined>();
    const [type, setType] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const spendingData = { userid, count, type, model };

        try {
            await postSpendings(spendingData);
            setMessage('Spending added successfully!');
            // Reset the form
            setUserId(undefined);
            setCount(undefined);
            setType('');
            setModel('');
        } catch (error) {
            setMessage('Failed to add spending. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="max-w-md w-full p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-4">Add New Spending </h2>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600">User ID</label>
                    <input
                        type="number"
                        value={userid}
                        onChange={(e) => setUserId(Number(e.target.value))}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600">Count</label>
                    <input
                        type="number"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600">Model</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400"
                        required
                    />
                </div>
                <button type="submit" className="w-full text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Add Spending
                </button>
                {message && <p className="mt-2 text-center text-sm text-gray-700">{message}</p>}
            </form>
        </div>
    );
};

export default AddSpending;
