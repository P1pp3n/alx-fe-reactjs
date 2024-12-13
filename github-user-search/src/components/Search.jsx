
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService'; // Ensure correct import for fetching data

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState(0); // State for minimum repository count
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'location') setLocation(value);
    if (name === 'minRepos') setMinRepos(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setUserData([]);
    setLoading(true);

    // Call fetchUserData with the username, location, and minRepos parameters
    try {
      const data = await fetchUserData(username, location, minRepos); // Pass the parameters
      setUserData(data.items || []); // Assuming the GitHub API response contains `items`
    } catch (error) {
      setError('Looks like we can’t find any users with those criteria');
    } finally {
      setLoading(false);
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
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username"
            className="border p-2 rounded w-full mb-4"
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleInputChange}
            placeholder="Enter location"
            className="border p-2 rounded w-full mb-4"
          />
        </div>
        <div>
          <input
            type="number"
            name="minRepos"
            value={minRepos}
            onChange={handleInputChange}
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
