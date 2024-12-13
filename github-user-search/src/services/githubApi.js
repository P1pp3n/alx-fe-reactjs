// src/services/githubApi.js
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users/';

// Fetch GitHub user data by username
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${username}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`, // Use VITE_ prefix for Vite's environment variables
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
