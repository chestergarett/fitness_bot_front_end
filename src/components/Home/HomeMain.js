import { Link as BrowserLink } from 'react-router-dom';
import classes from './HomeMain.module.css';
import HomeNav from './HomeNav';
import HomeBody from './HomeBody';
import HomeFeatures from './HomeFeatures';


const HomeMain = () => {
    return (
        <section className={classes.main}>
            <HomeNav />
            <HomeBody />
            <HomeFeatures />
        </section>            
    )
}

export default HomeMain;