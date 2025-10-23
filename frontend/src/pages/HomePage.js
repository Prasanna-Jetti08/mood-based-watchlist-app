import React, { useState, useEffect } from 'react';
import MoodSelector from '../components/MoodSelector.js';
import ItemCard from '../components/ItemCard.js';
import { getItems } from '../api/itemApi.js';

const HomePage = ({ userId }) => {
  const [mood, setMood] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (mood) {
      fetchItems();
    }
  }, [mood]);

  const fetchItems = async () => {
    try {
      const data = await getItems(userId, mood);
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome to your Watchlist</h1>
      <br></br>
      <MoodSelector onSelectMood={setMood} />
      {mood && (
        <div className="items-list">
          {items.length > 0 ? (
            items.map((item) => <ItemCard key={item._id} item={item} />)
          ) : (
            <p>No items found for this mood.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
