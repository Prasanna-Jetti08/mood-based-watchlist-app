import React, { useState } from 'react';
import { addItem } from '../api/itemApi.js';

const AddItemForm = ({ userId, mood, onItemAdded }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Movie');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !link) return;

    const newItem = { userId, mood, title, type, link };
    try {
      const savedItem = await addItem(newItem);
      onItemAdded(savedItem);
      setTitle('');
      setLink('');
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Movie">Movie</option>
        <option value="Book">Book</option>
      </select>
      <input
        type="url"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
