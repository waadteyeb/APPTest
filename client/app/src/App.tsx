import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/main';
import AddSpending from './pages/AddSpendings'; 
import './App.css';



function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/add-spendings" element={<AddSpending />} />
              
          </Routes>
      </Router>
  );
}

export default App;
