//dependencies
import { createContext } from 'react';

const UserContext = createContext({
    userAuth: {
        email: "",
        auth_token: "",
        id: "",
    },
    userHeaders: {
        'X-User-Email': JSON.parse(localStorage.getItem('userHeaders'))!==null ? JSON.parse(localStorage.getItem('userHeaders'))['X-User-Email'] : '',
        'X-User-Token': JSON.parse(localStorage.getItem('userHeaders'))!==null ? JSON.parse(localStorage.getItem('userHeaders'))['X-User-Token'] : '',
    },
});

export default UserContext;