
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserProvider from './context/user-provider.js';
import LoginMain from './components/Login/LoginMain';
import SignupMain from './components/Signup/SignupMain';
import HomeMain from './components/Home/HomeMain';
import Profile from './components/Profile/Profile';
import Survey from './components/Survey/Survey';


function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={HomeMain}/>
          <Route path='/Login' component={LoginMain}/>
          <Route path='/Signup' component={SignupMain}/>
          <Route path='/Profile' component={Profile}/>
          <Route path='/Survey' component={Survey}/>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
