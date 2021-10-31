
//css
import './App.css';
//dependencies
import { useContext,useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
//context
import UserProvider from './context/user-provider.js';
import UserContext from './context/user-context.js';
//components
import LoginMain from './components/Login/LoginMain';
import SignupMain from './components/Signup/SignupMain';
import HomeMain from './components/Home/HomeMain';
import Profile from './components/Profile/Profile';
import Survey from './components/Survey/Survey';
import WorkoutPlan from './components/WorkoutPlan/WorkoutPlan';
import DietPlan from './components/DietPlan/DietPlan';


function App() {

  const { userHeaders } = useContext(UserContext);

  const auth = (userHeaders['X-User-Token']!=='')

  return (
    <Router>
      <Switch>
      <UserProvider>
          {!auth ? 
            <Route path='/' exact component={HomeMain}/> : 
            <>
            <Route path='/Survey' component={Survey}/>
            <Route path='/Profile' component={Profile}/>
            <Route path='/DietPlan' component={DietPlan}/>
            <Route path='/WorkoutPlan' component={WorkoutPlan}/>
            </>
          }
            <Route path='/Login' component={LoginMain}/>
            <Route path='/Signup' component={SignupMain}/>
      </UserProvider>
      </Switch>
    </Router>
    
  );
}

export default App;
