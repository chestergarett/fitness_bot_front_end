//dependencies
import { useState, useContext } from 'react';
import { Link as BrowserLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './Survey.module.css';
import picture from '../../assets/survey_picture.jpg';
import logo from '../../assets/avatar_logo2.jpeg';
//material
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';

//components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const steps = [
    {label: 'Enter your vitals', questions: <Step1/> }, 
    {label: 'Tell us your goals', questions: <Step2/> }, 
    {label: 'Finishing touches', questions: <Step3/> }
];

const VerticalLinearStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();
    const { clientProfile, setClientProfile, userHeaders } = useContext(UserContext);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSucessMessage] = useState([])
    const [errorMessage, setErrorMessage] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };
    
    const submitSurvey = () => {
        const credentials = { 
            "[client_profile]first_name": `${clientProfile.first_name}`, 
            "[client_profile]last_name": `${clientProfile.last_name}`, 
            "[client_profile]height": `${clientProfile.height}`, 
            "[client_profile]current_weight": `${clientProfile.current_weight}`,
            "[client_profile]goal_weight": `${clientProfile.goal_weight}`,
            "[client_profile]sex": `${clientProfile.sex}`,
            "[client_profile]age": `${clientProfile.age}`,
            "[client_profile]workout_frequency": `${clientProfile.workout_frequency}`,
            "[client_profile]body_type": `${clientProfile.body_type}`,
            "[client_profile]target_date": `${clientProfile.target_date}`,
        }
        setIsLoading(true)
        axios.post('https://fitness-bot-avion.herokuapp.com/api/v1/client_profiles',qs.stringify(credentials),{
            headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
        })
        .then( (res) => {
            setIsLoading(false)
            setSuccess(true)
            history.push('/Profile')
        })
        .catch( (err) => {
            setIsLoading(false)
            setError(true)
            setSuccess(false)
            console.log(err)
        })
    }
    return (
        <Box sx={{ width: 500 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
            <Step key={step.label}>
                <StepLabel>
                {step.label}
                </StepLabel>
                <StepContent>
                <Typography>{step.questions}</Typography>
                <Box sx={{ mb: 2 }}>
                    <div>
                    {index === steps.length - 1 ?
                        <Button variant="contained" onClick={submitSurvey} sx={{ mt: 1, mr: 1 }}>
                            {isLoading ? <LoadingSpinner/> : 'Submit'}
                        </Button> :
                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                            Continue
                        </Button>
                    }
                    <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button> 
                    </div>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        </Box>
    );
    }

const Survey = () => {
    return (
        <div className={classes.section}>
            <div className={classes.main}>
                <BrowserLink to='/'>
                    <img src={logo} alt='logo_pic' className={classes.logo}/>
                </BrowserLink>
                <Typography variant='h4' className={classes.heading}>Just a few more steps, before you're all set.</Typography>
                <VerticalLinearStepper/>
            </div>
            <img src={picture} alt='survey_pic' className={classes.picture}/>
        </div>
        )
}

export default Survey;