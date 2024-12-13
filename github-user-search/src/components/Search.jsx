// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService'; // Make sure the path is correct

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

    // Reset previous error or data
    setError(null);
    setUserData(null);
    setLoading(true); // Start loading while fetching data

    if (username.trim() !== '') {
      try {
        const data = await fetchUserData(username);  // Fetch user data from the API
        setUserData(data);  // Update the state with user data
      } catch (error) {
        setError("Looks like we can’t find the user");  // Handle API errors (user not found, etc.)
      } finally {
        setLoading(false);  // Stop loading once the request is complete
      }
    } else {
      setError('Please enter a username');  // Error if no username is entered
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
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
          {/* Display user data */}
          <h3 className="font-semibold text-lg">{userData.login}</h3> {/* Display login (GitHub username) */}
          <p>{userData.name || 'No name available'}</p> {/* Display name */}
          <p>{userData.bio || 'No bio available'}</p> {/* Display bio */}
          <p><strong>Location:</strong> {userData.location || 'Not available'}</p> {/* Display location */}
          <p><strong>Public Repositories:</strong> {userData.public_repos}</p> {/* Display repo count */}
          <img
            src={userData.avatar_url}
            alt="User Avatar"
            className="mt-2 w-24 h-24 rounded-full"
          /> {/* Display avatar */}
          <div>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View Profile
            </a> {/* Link to GitHub profile */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
