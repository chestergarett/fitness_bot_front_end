//dependencies
import { useContext, useState, useEffect } from 'react';
import axios from 'axios'
//context
import UserContext from './user-context.js';

const UserProvider = (props) => {
    const {userAuth, userHeaders} = useContext(UserContext);
    const [userWorkouts, setUserWorkouts] = useState([])

    const setUserAuth = (email, auth_token,id) => {
        userAuth.email = email;
        userAuth.auth_token = auth_token;
        userAuth.id = id;
    }

    const setHeaders = (email, auth_token) => {
        userHeaders["X-User-Email"] = email;
        userHeaders["X-User-Token"] = auth_token;
    }

    useEffect( ()=> {
        axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/workout_plans/user_workouts', 
        { headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')) })
        .then((res)=> { 
            setUserWorkouts(res.data.data)
            console.log(userWorkouts)
        })
        .catch((error) => { 
            console.log(error.response)
        })
    },[])

    return (
        <UserContext.Provider
            value={{userAuth, 
                setUserAuth,
                userHeaders,
                setHeaders,
                userWorkouts}}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;

