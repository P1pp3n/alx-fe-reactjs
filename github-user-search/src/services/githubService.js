import axios from 'axios';


export const fetchUserData = async (username, location, minRepos) => {
  const baseURL = 'https://api.github.com/search/users?q=';

  // Build the query string based on the provided parameters
  let query = `${username ? username : ''}`;

  if (location) {
    query += `+location:${location}`; // Add location to the query if provided
  }

  if (minRepos) {
    query += `+repos:>${minRepos}`; // Add minRepos to the query if provided
  }

  try {
    // Make the API request with the constructed query string
    const response = await axios.get(`${baseURL}${query}`);

    // Return the data from the API response (users list)
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};
