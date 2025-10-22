import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import AddItemPage from './pages/AddItemPage.js';

function App() {
  const [userId, setUserId] = useState('12345'); // Replace with actual user authentication logic

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Item</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage userId={userId} />} />
          <Route path="/add" element={<AddItemPage userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
