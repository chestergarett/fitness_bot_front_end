//dependencies
import { useContext, useState } from 'react';
//context
import UserContext from './user-context.js';

const UserProvider = (props) => {
    const {userAuth, userHeaders} = useContext(UserContext);

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
                setHeaders}}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;

