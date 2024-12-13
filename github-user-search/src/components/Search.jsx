
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService'; // Ensure correct import for fetching data

const Search = () => {
  const [username, setUsername] = useState('');  // State for the GitHub username
  const [location, setLocation] = useState('');  // State for the location
  const [minRepos, setMinRepos] = useState(0);  // State for the minimum repositories count
  const [userData, setUserData] = useState([]);  // State for storing the user data results
  const [error, setError] = useState(null);  // State for handling errors
  const [loading, setLoading] = useState(false);  // State for tracking loading status

  // Handle input change for all fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;  // Destructure the name and value from the event's target element

    // Update corresponding state based on the input field name
    if (name === 'username') setUsername(value);
    if (name === 'location') setLocation(value);
    if (name === 'minRepos') setMinRepos(value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent page refresh on form submission

    // Clear previous errors and user data
    setError(null);
    setUserData([]);
    setLoading(true);  // Set loading to true while the API request is being processed

    // Construct the query string dynamically
    let query = `${username ? username : ''}`;

    if (location) {
      query += `+location:${location}`;  // Add location filter if it's provided
    }

    if (minRepos) {
      query += `+repos:>${minRepos}`;  // Add minimum repos filter if it's provided
    }

    if (!query.trim()) {
      setError('Please provide at least one search criteria!');
      setLoading(false);  // Turn off loading indicator if no criteria is provided
      return;
    }

    try {
      // Make the API call using the constructed query
      const data = await fetchUserData(username, location, minRepos);
      setUserData(data.items || []);  // Set user data in state, assuming the API returns 'items'
    } catch (error) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);  // Turn off loading indicator
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">GitHub User Search</h2>

      {/* Search Form with Advanced Criteria */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <input
            type="text"
            name="username"  // Ensure the name attribute corresponds to the state variable
            value={username}
            onChange={handleInputChange}  // Capture user input value using event.target.value
            placeholder="Enter GitHub username"
            className="border p-2 rounded w-full mb-4"
          />
        </div>
        <div>
          <input
            type="text"
            name="location"  // Ensure the name attribute corresponds to the state variable
            value={location}
            onChange={handleInputChange}  // Capture user input value using event.target.value
            placeholder="Enter location"
            className="border p-2 rounded w-full mb-4"
          />
        </div>
        <div>
          <input
            type="number"
            name="minRepos"  // Ensure the name attribute corresponds to the state variable
            value={minRepos}
            onChange={handleInputChange}  // Capture user input value using event.target.value
            placeholder="Minimum Repositories"
            className="border p-2 rounded w-full mb-4"
            min="0"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {/* Conditional Rendering Based on API Call Status */}
      {loading && <div className="text-blue-500">Loading...</div>}
      {error && !loading && <div className="text-red-500">{error}</div>}

      {/* Displaying User Results */}
      {userData.length > 0 && !loading && (
        <div>
          {userData.map((user) => (
            <div key={user.id} className="mt-4 border p-4 rounded">
              <h3 className="font-semibold text-lg">{user.login}</h3>
              <p>{user.name || 'No name available'}</p>
              <p>{user.bio || 'No bio available'}</p>
              <p><strong>Location:</strong> {user.location || 'Not available'}</p>
              <p><strong>Public Repositories:</strong> {user.public_repos}</p>
              <img
                src={user.avatar_url}
                alt="User Avatar"
                className="mt-2 w-24 h-24 rounded-full"
              />
              <div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
