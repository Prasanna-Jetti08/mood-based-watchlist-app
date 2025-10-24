import axios from 'axios';
import { ENDPOINTS, getApiConfig } from './config';

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${ENDPOINTS.USERS}/register`, userData, getApiConfig());
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${ENDPOINTS.USERS}/login`, credentials, getApiConfig());
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
