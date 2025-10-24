import axios from 'axios';
import { ENDPOINTS, getApiConfig } from './config';

// Get all items for a specific mood and user
export const getItems = async (userId, mood) => {
  try {
    const response = await axios.get(`${ENDPOINTS.ITEMS}?userId=${userId}&mood=${mood}`, getApiConfig());
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Add a new item
export const addItem = async (itemData) => {
  try {
    // Format and validate URL
    if (itemData.link) {
      let link = itemData.link.trim();
      
      // Add https:// if the URL starts with www.
      if (link.startsWith('www.')) {
        link = 'https://' + link;
      }
      
      // Add https:// if there's no protocol
      if (!link.startsWith('http://') && !link.startsWith('https://')) {
        link = 'https://' + link;
      }

      try {
        new URL(link);
        itemData.link = link; // Update the link with the formatted version
      } catch (e) {
        throw new Error('Please enter a valid URL');
      }
    }

    const response = await axios.post(ENDPOINTS.ITEMS, itemData, getApiConfig());
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }
    if (!error.response) {
      throw new Error('Network error. Please check if the server is running.');
    }
    throw error;
  }
};
