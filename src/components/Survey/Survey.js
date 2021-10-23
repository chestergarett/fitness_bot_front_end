//dependencies
import { useState } from 'react';
import { Link as BrowserLink, useHistory } from 'react-router-dom';
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
import Paper from '@mui/material/Paper';
//components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const steps = [
    {label: 'Enter your vitals', questions: <Step1/>}, 
    {label: 'Tell us your goals', questions: <Step2/>}, 
    {label: 'Finishing touches', questions: <Step3/>}];

const VerticalLinearStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();
    
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
        history.push('/Profile')
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
                            Submit
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