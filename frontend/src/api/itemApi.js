import axios from 'axios';

const API_URL = '/api/items/';

// Get all items for a specific mood and user
export const getItems = async (userId, mood) => {
  try {
    const response = await axios.get(`${API_URL}?userId=${userId}&mood=${mood}`);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      throw error;
    }
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

    console.log('Making API request to:', API_URL);
    console.log('Request data:', itemData);

    const response = await axios.post(API_URL, itemData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // Increase timeout to 30 seconds
      validateStatus: function (status) {
        return status >= 200 && status < 500; // Don't reject if status is between 200 and 499
      }
    });
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
