//css
import classes from './LoginMain.module.css';
//components
import LoginAvatar from './LoginAvatar';
import LoginForm from './LoginForm';

const LoginMain = () => {

    return (
        <section className={classes.main}>
            <LoginAvatar />
            <LoginForm />
        </section>
    )
}

export default LoginMain;