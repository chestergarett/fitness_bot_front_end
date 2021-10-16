
import classes from './HomeMain.module.css';
import HomeNav from './HomeNav';
import HomeBody from './HomeBody';
import HomeFeatures from './HomeFeatures';
import Footer from '../Footer/Footer';


const HomeMain = () => {
    return (
        <section className={classes.main}>
            <HomeNav />
            <HomeBody />
            <HomeFeatures />
            <Footer/>
        </section>            
    )
}

export default HomeMain;