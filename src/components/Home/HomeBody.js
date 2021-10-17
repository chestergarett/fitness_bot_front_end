//dependencies
import { Link as BrowserLink } from 'react-router-dom';
//css
import classes from './HomeBody.module.css';
import picture from '../../assets/cover_main.jpg';
//material
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const HomeBody = () => {
    return (
        <div className={classes.main}>
            <div className={classes.text}>
                <Typography component="div" variant="h5">
                    Anything can be easy with <br/><span className={classes.emphasis}> Fitness Bot.</span>
                </Typography>
                <BrowserLink to='/Login' className={classes.link}>
                    <Button className={classes.button}>Get Started</Button>
                </BrowserLink>
            </div>
            <img src={picture} alt='main_pic' className={classes.pic}/>
        </div>
    )
}

export default HomeBody;