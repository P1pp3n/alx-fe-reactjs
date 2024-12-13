// src/services/githubService.js
import axios from 'axios';

// Fetch user data with advanced search
export const fetchUserData = async (query) => {
  const url = `https://api.github.com/search/users?q=${query}&per_page=10`; // Limit results to 10 per page
  try {
    const response = await axios.get(url);
    return response.data;  // Return the whole data (items will contain the users)
  } catch (error) {
    throw new Error('Error fetching data from GitHub API');
  }
};
