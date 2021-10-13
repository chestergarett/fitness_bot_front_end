import classes from './LoginForm.module.css';
import logo from '../../assets/avatar_logo2.jpeg'

import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const LoginForm = () => {
    return (
        <div className={classes.main}>
            <img src={logo} alt='logo' className={classes.logo}/>
            <TextField id="standard-basic" label="Email" variant="outlined" className={classes.input}/>
            <TextField id="standard-basic" label="Password" type="password" variant="outlined" className={classes.input}/>
            <Link href="#" underline="hover" className={classes.link}>
                Forgot Password?
            </Link>
            <Button variant="contained" className={classes.button}>Login</Button>
        </div>
    )
}

export default LoginForm;