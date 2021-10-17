//dependencies
import { createContext } from 'react';

const UserContext = createContext({
    userAuth: {
        email: "",
        auth_token: "",
    },
});

export default UserContext;