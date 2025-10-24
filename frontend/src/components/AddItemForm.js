import React, { useState } from 'react';
import { addItem } from '../api/itemApi.js';

const AddItemForm = ({ userId, mood, onItemAdded }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Movie');
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!title) {
      setError('Please enter a title');
      return;
    }

    if (!mood) {
      setError('Please select a mood first');
      return;
    }

    setIsSubmitting(true);
    const newItem = { 
      userId, 
      mood, 
      title, 
      type, 
      comments
    };
    
    console.log('Attempting to add item:', newItem);
    
    try {
      console.log('Submitting item:', newItem);
      const savedItem = await addItem(newItem);
      console.log('Item saved:', savedItem);
      
      if (savedItem) {
        onItemAdded(savedItem);
        setTitle('');
        setComments('');
        setSuccess(`${type} "${title}" has been successfully added!`);
      } else {
        throw new Error('No response from server');
      }
    } catch (error) {
      console.error('Failed to add item:', error);
      let errorMessage;
      
      if (error.response) {
        console.error('Error response:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });
        errorMessage = error.response.data?.message || error.response.data?.error;
      }
      
      setError(`Error: ${errorMessage || error.message || 'Failed to add item. Please try again.'}`);
      
      // Log the full error object for debugging
      console.error('Full error object:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form className="add-item-form" onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Movie">Movie</option>
            <option value="Book">Book</option>
          </select>
        </div>
        <div>
          <textarea
            placeholder="Comments (optional)"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows="3"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
