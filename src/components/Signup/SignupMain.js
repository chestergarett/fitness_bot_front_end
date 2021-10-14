import classes from './SignupMain.module.css';
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