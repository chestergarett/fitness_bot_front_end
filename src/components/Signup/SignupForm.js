import { useState } from 'react';
import { Link as RouterLink }  from 'react-router-dom';

import classes from './SignupForm.module.css';
import logo from '../../assets/avatar_logo2.jpeg'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const initialState = {
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
}

const SignupForm = () => {

    const [formData, setFormData] = useState(initialState)
    return (
        <div className={classes.main}>
            <RouterLink to='/'>
                <img src={logo} alt='logo' className={classes.logo}/>
            </RouterLink>
            <Paper elevation={0} className={classes.header}>
                <Typography variant='h4' className={classes.headerMain}>Sign up </Typography>
                <Typography variant='body2'>It's quick & easy. </Typography>
            </Paper>
            <TextField 
                id="standard-basic" 
                label="Email" 
                variant="outlined" 
                className={classes.input}
                onChange={ (e) => setFormData({...formData, email: e.target.value})}
            />
            <TextField 
                id="standard-basic" 
                label="Username" 
                variant="outlined" 
                className={classes.input}
                onChange={ (e) => setFormData({...formData, username: e.target.value})}
            />
            <TextField 
                id="standard-basic" 
                label="Password" 
                type="password" 
                variant="outlined" 
                className={classes.input}
                onChange={ (e) => setFormData({...formData, password: e.target.value})}
            />
            <TextField 
                id="standard-basic" 
                label="Confirm Password" 
                type="password" 
                variant="outlined" 
                className={classes.input}
                onChange={ (e) => setFormData({...formData, password_confirmation: e.target.value})}
            />
            <span className={classes.subLabel}>
                By clicking Sign Up , you agree to our <span>Terms</span>, <span>Data Policy </span>and <span>Cookies Policy</span>. You may receive SMS Notifications from us and can opt out any time.
            </span>
            <Button 
                variant="contained" 
                className={classes.button2}
            >
                Sign Up
            </Button>
        </div>
    )
}

export default SignupForm;