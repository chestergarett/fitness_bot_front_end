//css
import classes from './SignupAvatar.module.css'
import picture from '../../assets/avatar_signup.svg';

const SignupAvatar = () => {
    return(
        <div className={classes.container}>
            <img className={classes.mainPic} src={picture}/>
        </div>
    )
}

export default SignupAvatar;