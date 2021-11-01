
//css
import './App.css';
//dependencies
import { useContext,useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
//context
import UserContext from './context/user-context.js';
//components
import LoginMain from './components/Login/LoginMain';
import SignupMain from './components/Signup/SignupMain';
import HomeMain from './components/Home/HomeMain';
import DashboardMain from './components/Dashboard/DashboardMain';
import Profile from './components/Profile/Profile';
import Survey from './components/Survey/Survey';
import WorkoutPlan from './components/WorkoutPlan/WorkoutPlan';
import DietPlan from './components/DietPlan/DietPlan';
import Notif from './components/Notif/Notif';

function App() {

  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  return (
    <Router>
      <Switch>
          {isAuthenticated  ? <Route path='/' exact component={DashboardMain}/> : <Route path='/' exact component={HomeMain}/>}
          {isAuthenticated ? 
          <>
          <Route path='/Survey' component={Survey}/>
          <Route path='/Dashboard' component={DashboardMain}/>
          <Route path='/Profile' component={Profile}/>
          <Route path='/DietPlan' component={DietPlan}/>
          <Route path='/WorkoutPlan' component={WorkoutPlan}/>
          <Route path='/Notif' component={Notif}/>
          </> :
          <>
          <Route path='/Home' component={HomeMain}/> 
          <Route path='/Login' component={LoginMain}/>
          <Route path='/Signup' component={SignupMain}/>
          </>
          }
      </Switch>
    </Router>
    
  );
}

export default App;
