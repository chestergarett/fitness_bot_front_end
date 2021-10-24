//dependencies
import { useContext, useState, useEffect } from 'react';
//context
import UserContext from './user-context.js';

const initialClientProfile = {
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

    const [userWorkouts, setUserWorkouts] = useState([])

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

    return (
        <UserContext.Provider
            value={{userAuth, 
                setUserAuth,
                userHeaders,
                setHeaders,
                userWorkouts, 
                setUserWorkouts,
                clientProfile,
                setClientProfile}}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;

