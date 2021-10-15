import classes from './HomeNav.module.css';
import { Link as BrowserLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { FaRobot } from 'react-icons/fa';

const HomeNav = () => {
    return(
        <Box sx={{ flexGrow: 1 }} className={classes.box}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar> 
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <FaRobot className={classes.icon} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.heading}>
                        fitness bot
                    </Typography>
                    <BrowserLink to='/Login'>
                        <Button color="inherit" className={classes.button}>Subscribe</Button>
                    </BrowserLink>
                    <BrowserLink to='/Login'>
                        <Button color="inherit" className={classes.button}>Login</Button>
                    </BrowserLink>
                    <BrowserLink to='/Signup'>
                        <Button color="inherit" className={classes.button2}>Signup</Button>
                    </BrowserLink>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default HomeNav;
