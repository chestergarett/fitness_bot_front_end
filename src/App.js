
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserProvider from './context/user-provider.js';
import LoginMain from './components/Login/LoginMain';
import SignupMain from './components/Signup/SignupMain';
import HomeMain from './components/Home/HomeMain';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={HomeMain}/>
          <Route path='/Login' component={LoginMain}/>
          <Route path='/Signup' component={SignupMain}/>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
