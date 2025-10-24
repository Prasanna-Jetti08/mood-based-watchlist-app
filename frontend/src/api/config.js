// Base API URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
    ITEMS: `${API_BASE_URL}/items`,
    USERS: `${API_BASE_URL}/users`
};

export const getApiConfig = () => ({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});