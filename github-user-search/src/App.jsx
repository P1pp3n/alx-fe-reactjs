import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import UserSearch from './components/Search';  

function App() {
  return (
    <Router>
      <div className="App">
        
        <header className="bg-blue-500 text-white p-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl">GitHub User Search</h1>
            <div>
              
              <Link to="/" className="mx-4 text-white">Home</Link>
              <Link to="/search" className="mx-4 text-white">Search User</Link>
            </div>
          </nav>
        </header>

      
        <main className="p-4">
          <Routes>
            
            <Route
              path="/"
              element={<div className="text-center text-xl">Welcome to the GitHub User Search App! Use the navigation to search for users.</div>}
            />
            <Route path="/search" element={<UserSearch />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
