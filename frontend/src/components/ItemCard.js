import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <h3>{item.title}</h3>
      <p>Type: {item.type}</p>
      <p>Mood: {item.mood}</p>
      {item.comments && (
        <p className="comments">
          <strong>Comments:</strong> {item.comments}
        </p>
      )}
    </div>
  );
};

export default ItemCard;
