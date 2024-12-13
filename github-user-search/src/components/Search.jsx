import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService'; // Import the API function

const UserSearch = () => {
  const [username, setUsername] = useState(''); // State to hold the username input
  const [userData, setUserData] = useState(null); // State to store fetched user data
  const [error, setError] = useState(null); // State to handle errors

  // Handle input change
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle form submission to fetch user data
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    setError(null); // Clear previous errors
    setUserData(null); // Reset previous user data

    if (username.trim() !== '') {
      try {
        // Fetch user data from the GitHub API
        const data = await fetchUserData(username);
        setUserData(data); // Set the fetched data to the state
      } catch (error) {
        setError('User not found or an error occurred'); // Set error state
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">GitHub User Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {/* Display the error if any */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {/* Display user data if available */}
      {userData && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">{userData.name}</h3>
          <p>{userData.bio}</p>
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

export default UserSearch;
