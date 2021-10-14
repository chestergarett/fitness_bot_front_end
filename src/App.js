
import './App.css';
import { useState } from 'react';
import LoginMain from './components/Login/LoginMain';
import UserProvider from './context/user-provider.js';


function App() {
  return (
    <UserProvider>
      <LoginMain/>
    </UserProvider>
  );
}

export default App;
