/**
 * Service for:
 *  making HTTP requests
 *  sending data back
 *  setting data in localStorage
 */
import axios from 'axios';

const API_URL = '/api/users/';

/**
 * Register User
 * @param {*} userData
 * @returns response data
 */
const register = async (userData) => {
  // Get response from server
  const response = await axios.post(API_URL, userData);

  // If response is valid set localStorage user
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

/**
 * Login User
 * @param {*} userData
 * @returns response data
 */
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

/**
 * Logout user
 */
const logout = async () => {
  localStorage.removeItem('user');
};

// Set functions to export
const authService = {
  register,
  login,
  logout,
};

export default authService;
