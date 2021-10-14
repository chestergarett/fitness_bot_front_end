import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import UserContext from '../../context/user-context.js';

import classes from './LoginForm.module.css';
import logo from '../../assets/avatar_logo2.jpeg'

import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const initialState = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [formData, setFormData] = useState(initialState);
    const { userAuth,setUserAuth } = useContext(UserContext);
    const loginUser = () => {
        const credentials = {email: formData.email, password: formData.password }
        axios.post('https://fitness-bot-avion.herokuapp.com/api/v1/sessions', credentials)
        .then( (res) => { 
            setUserAuth(res.data.data.user.email, res.data.data.user.authentication_token)
            console.log(userAuth)
        })
        .catch( (err) => console.log(err))
    }

    return (
        <div className={classes.main}>
            <img src={logo} alt='logo' className={classes.logo}/>
            <TextField 
                id="standard-basic" 
                label="Email" 
                variant="outlined" 
                className={classes.input}
                onChange={ (e) => setFormData({...formData, email: e.target.value})}
            />
            <TextField 
                id="standard-basic" 
                label="Password" 
                type="password" 
                variant="outlined" 
                className={classes.input}
                onChange={ (e) => setFormData({...formData, password: e.target.value})}
            />
            <Link href="#" underline="hover" className={classes.link}>
                Forgot Password?
            </Link>
            <Button 
                variant="contained" 
                onClick={loginUser}
                className={classes.button}
            >
                Login
            </Button>
            <Divider className={classes.divider}/>
            <Button 
                variant="contained" 
                onClick={loginUser}
                className={classes.button2}
            >
                Create Account
            </Button>
        </div>
    )
}

export default LoginForm;