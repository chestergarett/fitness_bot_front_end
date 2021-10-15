import { useState, useContext } from 'react';
import { Link as RouterLink, useHistory }  from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../context/user-context.js';

import classes from './LoginForm.module.css';
import logo from '../../assets/avatar_logo2.jpeg'

import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const initialState = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { userAuth,setUserAuth } = useContext(UserContext);
    const history = useHistory();

    const loginUser = () => {
        const credentials = {email: formData.email, password: formData.password }
        setIsLoading(true)
        axios.post('https://fitness-bot-avion.herokuapp.com/api/v1/sessions', credentials)
        .then( (res) => { 
            setUserAuth(res.data.data.user.email, res.data.data.user.authentication_token)
            console.log(userAuth)
            setIsLoading(false)
            history.push('/Profile')
        })
        .catch( (err) => {
            console.log(err)
            setIsLoading(false) })
    }

    return (
        <div className={classes.main}>
            <RouterLink to='/'>
                <img src={logo} alt='logo' className={classes.logo}/>
            </RouterLink>
            <Paper elevation={0} className={classes.header}>
                <Typography variant='h4' className={classes.headerMain}>Sign in </Typography>
                <Typography variant='body2'>Make yourself stronger than your excuses. </Typography>
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
                {!isLoading ? 'Login' : <LoadingSpinner/>}
            </Button>
            <Divider className={classes.divider}/>
            <RouterLink to='/Signup' className={classes.routerLink}>
                <Button 
                    variant="contained" 
                    onClick={loginUser}
                    className={classes.button2}
                >
                    Create Account
                </Button>
            </RouterLink>
            <div className={classes.footer}>
                <Typography variant='overline' className={classes.footerLabels}>User Agreement</Typography>
                <Typography variant='overline' className={classes.footerLabels}>Privacy Policy</Typography>
                <Typography variant='overline' className={classes.footerLabels}>Community Guidelines</Typography>
                <Typography variant='overline' className={classes.footerLabels}>Cookie Policy</Typography>
                <Typography variant='overline' className={classes.footerLabels}>Copyright Policy</Typography>
            </div>
        </div>
    )
}

export default LoginForm;