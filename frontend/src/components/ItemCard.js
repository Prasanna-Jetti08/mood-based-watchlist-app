import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <h3>{item.title}</h3>
      <p>Type: {item.type}</p>
      <p>Mood: {item.mood}</p>
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        View
      </a>
    </div>
  );
};

export default ItemCard;
