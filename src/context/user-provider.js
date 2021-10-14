import { useContext, useState } from 'react';
import UserContext from './user-context.js';

const UserProvider = (props) => {
    const {userAuth} = useContext(UserContext);

    const [displayModal, setDisplayModal] = useState(false);

    const closeModals = () => {
        setDisplayModal(false)
    }

    const openModals = () => {
        setDisplayModal(true)
    }

    const setUserAuth = (email, auth_token) => {
        userAuth.email = email;
        userAuth.auth_token = auth_token;
    }

    return (
        <UserContext.Provider
            value={{userAuth, 
                setUserAuth,
                closeModals,
                openModals}}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;

