import classes from './LoginAvatar.module.css'
import picture from '../../assets/avatar_login2.png';

const LoginAvatar = () => { 

    return (
        <div className={classes.container}>
            <img className={classes.mainPic} src={picture}/>
        </div>
        
    )
}

export default LoginAvatar;