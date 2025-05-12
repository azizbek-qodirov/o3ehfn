import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Set base URL for API requests
axios.defaults.baseURL = process.env.NODE_ENV === 'development' 
  ? 'https://shikoyat.zapto.org/'
  : '/api';

// Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
