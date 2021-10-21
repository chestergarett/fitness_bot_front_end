//dependencies
import { createContext } from 'react';

const UserContext = createContext({
    userAuth: {
        email: "",
        auth_token: "",
        id: "",
    },
    userHeaders: {
        'X-User-Email': "",
        'X-User-Token': "",
    },
});

export default UserContext;