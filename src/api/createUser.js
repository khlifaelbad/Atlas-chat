import axios from "axios";

// Define the base URL of your backend
const API_URL = "http://localhost:3001/api";

// Create a user
export const createUser = async (userName, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/createUser`, {
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Login a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Fetch all users (for testing)
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
