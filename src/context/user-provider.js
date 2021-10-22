//dependencies
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
//context
import UserContext from './user-context.js';

const UserProvider = (props) => {
    const {userAuth, userHeaders} = useContext(UserContext);
    const [userWorkouts, setUserWorkouts] = useState([])
    let events = []
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
                setUserWorkouts}}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;

