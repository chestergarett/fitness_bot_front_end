//classes
import classes from './Footer.module.css';
//material
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';


const Footer = () => {
    return(
        <AppBar className={classes.footer} elevation={0}>
            <div className={classes.container}>
                <Typography variant='caption'>Plans & Pricing</Typography>
                <Typography variant='caption'>About us</Typography>
                <Typography variant='caption'>Terms & Conditions</Typography>
                <Typography variant='caption'>License & Agreements</Typography>
                <Typography variant='caption'>Privacy Policy</Typography>
                <Typography variant='caption'>Cookies Policy</Typography>
                <Typography variant='caption'>Cookies Settings</Typography>
                <Typography variant='caption'>Support</Typography>
                <Typography variant='caption'>Contact</Typography>
            </div>
      </AppBar>
    )
}

export default Footer;