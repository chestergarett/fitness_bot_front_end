import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//context
import UserProvider from './context/user-provider.js';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
