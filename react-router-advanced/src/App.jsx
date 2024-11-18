// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import BlogPost from "./components/BlogPost";
import useAuth from "./hooks/useAuth"; // Import useAuth hook

const App = () => {
  const { isAuthenticated, login, logout } = useAuth(); // Use the hook

  return (
    <Router>
      <div>
        <h1>My React Router App</h1>
        <button onClick={isAuthenticated ? logout : login}>
          {isAuthenticated ? "Logout" : "Login"}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/user/:userId" element={<User Profile />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
