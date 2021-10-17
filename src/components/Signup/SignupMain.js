//css
import classes from './SignupMain.module.css';
//components
import SignupAvatar from './SignupAvatar';
import SignupForm from './SignupForm';

const SignupMain = () => {
    return (
        <section className={classes.main}>
            <SignupAvatar />
            <SignupForm />
        </section>
    )
}

export default SignupMain;