import axios from 'axios';

// Function to fetch user data from GitHub API
export const fetchUserData = async (query) => {
  const baseURL = 'https://api.github.com/search/users?q=';

  try {
    const response = await axios.get(`${baseURL}${query}`);
    
    // Return the data from the API response (users list)
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};
