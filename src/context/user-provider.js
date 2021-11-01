//dependencies
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
//context
import UserContext from './user-context.js';

const initialClientProfile = {
    id: '',
    first_name: '',
    last_name: '',
    height: '',
    current_weight: '',
    goal_weight: '',
    sex: '',
    age: '',
    workout_frequency: '',
    body_type: '',
    target_date: '',
}

const UserProvider = (props) => {
    const { userAuth, userHeaders } = useContext(UserContext);
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [userFoods, setUserFoods] = useState([]);
    const [userDietPlans, setUserDietPlans] = useState([]);
    const [userSelectedDietPlan, setUserSelectedDietPlan] = useState({});
    const [userFoodOptions, setFoodOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [clientProfile, setClientProfile] = useState(initialClientProfile)

    const setUserAuth = (email, auth_token,id) => {
        userAuth.email = email;
        userAuth.auth_token = auth_token;
        userAuth.id = id;
    }

    const setHeaders = (email, auth_token) => {
        userHeaders["X-User-Email"] = email;
        userHeaders["X-User-Token"] = auth_token;
    }

    const history = useHistory();

    const loginUser = (email, password) => {
        const credentials = {email: email, password: password }
        setIsLoading(true)
        axios.post('https://fitness-bot-avion.herokuapp.com/api/v1/sessions', credentials)
        .then( (res) => { 
            setUserAuth(res.data.data.user.email, res.data.data.user.authentication_token, res.data.data.user.id)
            setHeaders( res.data.data.user.email, res.data.data.user.authentication_token )
            localStorage.setItem('userHeaders', JSON.stringify(userHeaders))
            setIsLoading(false)
            history.push('/Profile')
        })
        .catch( (err) => {
            console.log(err)
            setIsLoading(false)
            setErrorMessage(true) })
    }

    const logoutUser = () => {
        window.localStorage.removeItem('userHeaders')
        history.push('/')
      };
    
    return (
        <UserContext.Provider
            value={{
                //workout methods
                userWorkouts, 
                setUserWorkouts,
                //client profile methods
                clientProfile,
                setClientProfile,
                //diet plan methods
                userDietPlans,
                setUserDietPlans,
                userSelectedDietPlan,
                setUserSelectedDietPlan,
                //food option methods
                userFoodOptions,
                setFoodOptions,
                userFoods,
                setUserFoods,
                //authentication methods
                userAuth, 
                setUserAuth,
                userHeaders,
                setHeaders,
                loginUser,
                errorMessage,
                setErrorMessage,
                isLoading,
                setIsLoading,
                logoutUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;

