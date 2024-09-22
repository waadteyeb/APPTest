import React, { useEffect, useState } from 'react';
import SpendingTable from '../components/SpendingsTable';
import { fetchSpendings } from '../services/apiget';
import { Link } from 'react-router-dom';
import SpendingFilter from '../components/SpendingsFilter';
import SpendingChart from '../components/SpendingChart';
import Card from '../components/card';
import '../App.css';


const Main: React.FC= () =>{
  const [spendings, setSpendings] = useState<any[]>([]);
  const [filteredSpendings, setFilteredSpendings] = useState<any[]>([]);

  const loadSpendings = async (filters: any) => {
    try {
      const data = await fetchSpendings(filters);
      setSpendings(data);
      setFilteredSpendings(data);
    } catch (error) {
      console.error('Error fetching spendings:', error);
    }
  };

  useEffect(() => {
    loadSpendings({});
  }, []);

  const handleFilter = async (filters: any) => {
    await loadSpendings(filters);
  };

  return (
    
    <div className="container mx-auto p-4">
     
      <SpendingFilter onFilter={handleFilter} />
      <SpendingChart spendings={filteredSpendings} />

      {filteredSpendings.length > 0 ? (
        <SpendingTable spendings={filteredSpendings} />
      ) : (
        <div className="mt-4 text-gray-600 text-center">
          <p>No spendings found based on the applied filters.</p>
        </div>
      )}
      <Card extra={"w-full pb-10 p-4 h-full flex flex-col items-center"}>
        <h2 className="text-2xl font-bold mb-4">You Can Add Spendings Here</h2>
          <div className="mb-4">
            <Link to="/add-spendings">
              <button className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500">
                  Add New Spending
              </button>
            </Link>
          </div>
      </Card>

    </div>
  );
}

export default Main;
