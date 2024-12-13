// src/services/githubService.js
import axios from 'axios';

// Define the GitHub API endpoint for user search
const GITHUB_API_URL = 'https://api.github.com/users/';

// Function to fetch user data by username
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${username}`);
    return response.data;  // Return the user data from the API response
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;  // Throw error to be handled by the calling component
  }
};
