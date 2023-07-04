import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SearchBar from './components/searchbar';
const alperen = ReactDOM.createRoot(document.getElementById('alperen'));
alperen.render(
  <React.StrictMode>
    <SearchBar />
  </React.StrictMode>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
