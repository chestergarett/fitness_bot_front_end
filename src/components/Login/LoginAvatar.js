//css
import classes from './LoginAvatar.module.css'
//import picture from '../../assets/avatar_sprinter.svg';

const LoginAvatar = () => { 

    return (
        <div className={classes.container}>
            <lottie-player className={classes.mainPic} src="https://assets8.lottiefiles.com/private_files/lf30_h2fodibc.json" speed="1"  style={{width: "600px", height: "600px"}}  loop autoplay></lottie-player>
        </div>        
    )
}

export default LoginAvatar;