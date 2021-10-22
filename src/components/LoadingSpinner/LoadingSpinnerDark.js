//css
import classes from './LoadingSpinnerDark.module.css';

const LoadingSpinnerDark = () => {
    return (
        <div className={classes.spinner}>
            <div className={classes.bounce1}></div>
            <div className={classes.bounce2}></div>
            <div className={classes.bounce3}></div>
        </div>
    )
}

export default LoadingSpinnerDark;