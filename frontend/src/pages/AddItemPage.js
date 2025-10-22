import React, { useState } from 'react';
import MoodSelector from '../components/MoodSelector.js';
import AddItemForm from '../components/AddItemForm.js';

const AddItemPage = ({ userId }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [addedItems, setAddedItems] = useState([]);

  const handleItemAdded = (item) => {
    setAddedItems((prev) => [...prev, item]);
  };

  return (
    <div className="add-item-page">
      <h1>Add a new item</h1>
      <MoodSelector onSelectMood={setSelectedMood} />
      {selectedMood && (
        <AddItemForm
          userId={userId}
          mood={selectedMood}
          onItemAdded={handleItemAdded}
        />
      )}
      {addedItems.length > 0 && (
        <div className="added-items">
          <h2>Recently Added Items</h2>
          <ul>
            {addedItems.map((item) => (
              <li key={item._id}>{item.title} ({item.type})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddItemPage;
