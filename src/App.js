
//css
import './App.css';
//dependencies
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//context
import UserProvider from './context/user-provider.js';
//components
import LoginMain from './components/Login/LoginMain';
import SignupMain from './components/Signup/SignupMain';
import HomeMain from './components/Home/HomeMain';
import Profile from './components/Profile/Profile';
import Survey from './components/Survey/Survey';
import WorkoutPlan from './components/WorkoutPlan/WorkoutPlan';


function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={HomeMain}/>
          <Route path='/Login' component={LoginMain}/>
          <Route path='/Signup' component={SignupMain}/>
          <Route path='/Survey' component={Survey}/>
          <Route path='/Profile' component={Profile}/>
          <Route path='/WorkoutPlan' component={WorkoutPlan}/>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
