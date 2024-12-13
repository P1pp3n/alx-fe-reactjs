import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService'; 

const Search = () => {
  const [username, setUsername] = useState('');  // State for the search input
  const [userData, setUserData] = useState(null); // State to store fetched user data
  const [error, setError] = useState(null);  // State to handle errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Handle input changes for the search field
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle form submission (trigger search)
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    setError(null);  // Reset error state
    setUserData(null);  // Clear previous user data
    setLoading(true);  // Set loading to true while making the API call

    if (username.trim() !== '') {
      try {
        const data = await fetchUserData(username);  // Fetch user data from the service
        setUserData(data);  // Set the user data to state
      } catch (error) {
        setError('Looks like we can’t find the user');  // Handle error state
      } finally {
        setLoading(false);  // Stop loading once the request is complete
      }
    } else {
      setError('Please enter a username');  // Handle case where no username is entered
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">GitHub User Search</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {/* Conditional Rendering Based on API Call Status */}
      {loading && (
        <div className="text-blue-500">Loading...</div>
      )}

      {error && !loading && (
        <div className="text-red-500">{error}</div>
      )}

      {userData && !loading && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">{userData.name || 'No name provided'}</h3>
          <p>{userData.bio || 'No bio available'}</p>
          <p><strong>Location:</strong> {userData.location || 'Not available'}</p>
          <p><strong>Public Repositories:</strong> {userData.public_repos}</p>
          <img src={userData.avatar_url} alt="User Avatar" className="mt-2 w-24 h-24 rounded-full" />
          <div>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
