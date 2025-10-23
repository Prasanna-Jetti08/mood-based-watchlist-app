import axios from 'axios';

const API_URL = '/api/items/';

// Get all items for a specific mood and user
export const getItems = async (userId, mood) => {
  try {
    const response = await axios.get(`${API_URL}?userId=${userId}&mood=${mood}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Add a new item
export const addItem = async (itemData) => {
  try {
    const response = await axios.post(API_URL, itemData);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};
