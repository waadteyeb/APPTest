import React, { useState } from 'react';
import Card from "./card";

interface FilterProps {
    onFilter: (filters: { userid?: number; startdate?: string; enddate?: string; type?: string; model?: string }) => void;
}

const SpendingFilter: React.FC<FilterProps> = ({ onFilter }) => {
    const [userid, setUserId] = useState<number | undefined>();
    const [startdate, setStartDate] = useState<string>('');
    const [enddate, setEndDate] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [model, setModel] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const filters: { userid?: number; startdate?: string; enddate?: string; type?: string; model?: string } = {};
    
        if (userid !== undefined) {
            filters.userid = userid;
        }
        if (startdate) {
            filters.startdate = startdate;
        }
        if (enddate) {
            filters.enddate = enddate;
        }
        if (type) {
            filters.type = type;
        }
        if (model) {
            filters.model = model;
        }
    
        console.log('Filters submitted:', filters);
        onFilter(filters);
    };
    
    

    return (
        <Card extra={"w-full pb-10 p-4 h-full"}>
         <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <h2 className="text-2xl font-bold mb-4">Filter the Spendings here</h2>
            <form onSubmit={handleSubmit} className="flex space-x-4">
                <div className="flex flex-col w-full">
                    <label className="text-sm font-bold text-gray-600">USER ID</label>
                    <input
                        type="number"
                        onChange={(e) => setUserId(Number(e.target.value))}
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-bold text-gray-600">START DATE</label>
                    <input
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-bold text-gray-600">END DATE</label>
                    <input
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-bold text-gray-600">TYPE</label>
                    <input
                        type="text"
                        onChange={(e) => setType(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-bold text-gray-600">MODEL</label>
                    <input
                        type="text"
                        onChange={(e) => setModel(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex flex-col w-full">
                <button type="submit" className="bg-teal-400 text-white py-2 px-4 mt-4 rounded-full ">Filter</button>
                </div>
            </form>
         </div>
        </Card>
    );
};

export default SpendingFilter;
