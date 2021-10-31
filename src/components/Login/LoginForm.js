//dependecies
import { useState, useContext } from 'react';
import { Link as RouterLink, useHistory, Redirect }  from 'react-router-dom';
import axios from 'axios';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './LoginForm.module.css';
import logo from '../../assets/avatar_logo2.jpeg'
//material
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
//components
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const initialState = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const { loginUser, errorMessage, isLoading } = useContext(UserContext);
    const [formData, setFormData] = useState(initialState)

    return (
        <div className={classes.main}>
            <RouterLink to='/'>
                <img src={logo} alt='logo' className={classes.logo}/>
            </RouterLink>
            <Paper elevation={0} className={classes.header}>
                <Typography variant='h4' className={classes.headerMain}>Sign in </Typography>
                <Typography variant='body2'>Make yourself stronger than your excuses. </Typography>
            </Paper>
            {errorMessage ? <span className={classes.errors}>Invalid Credentials. Please double check.</span> : ''}
            <TextField 
                id="login-email-form" 
                label="Email" 
                variant="outlined" 
                className={classes.input}
                onChange={ (e) => setFormData({...formData, email: e.target.value})}
            />
            <TextField 
                id="login-password-form" 
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
                onClick={()=>{loginUser(formData.email, formData.password)}}
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