// src/main.jsx or src/index.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/tailwind.css' // Import Tailwind CSS styles
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
