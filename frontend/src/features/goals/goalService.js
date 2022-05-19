/**
 * Service for:
 *  making HTTP requests
 *  sending data back
 */
import axios from 'axios';

const API_URL = '/api/goals/';

/**
 * API Request to fetch all User Goals
 * @param {*} token
 * @returns Response Data
 */
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Await response in URL with headers
  const response = await axios.get(API_URL, config);

  return response.data;
};

/**
 * APIRequest to create a Goal in database
 * @param {*} goalData Text
 * @param {*} token JWT Token
 * @returns Response Data
 */
const createGoal = async (goalData, token) => {
  // Configuring headers authorization so bearer token is sent
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Await response in URL with send data and headers
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

/**
 * API Request to update existing goal in database
 * @param {*} id
 * @param {*} goalData
 * @param {*} token
 */
const updateGoal = async (goalData, token) => {
  const {id} = goalData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Await response in URL + goalId with goalData and headers
  const response = await axios.put(API_URL + id, goalData, config);

  return response.data;
};

/**
 * API Request to delete existing Goal from database
 * @param {*} id
 * @param {*} token
 * @returns Response data
 */
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Await response in URL + goalId with headers
  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

/**
 * Set functions to export
 */
const goalService = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};

export default goalService;
