//dependencies
import { useState, useContext } from 'react';
import qs from 'qs';
import axios from 'axios';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './UpdateDietPlanSelected.module.css';
//components
import CenteredModalLight from '../Modals/CenteredModalLight';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
//material
import Card from '@mui/material/Card';
import Typography from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormGroup from '@mui/material/FormGroup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';

const UpdateDietPlanSelected = (props) => {
    
    const { userHeaders, 
        setUserSelectedDietPlan,
         } = useContext(UserContext);

    const [startValue, setStartValue] = useState(props.selected?.created_at);
    const [endValue, setEndValue] = useState(props.selected?.end_date);    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialState = {
        title: props.selected?.title,
        description: props.selected?.description,
    }

    const [formData, setFormData] = useState(initialState)

    const submitHandler = () => {
        setIsLoading(true)
        
        const credentials = {
            "[diet_plan]title": formData.title,
            "[diet_plan]description": formData.description,
            "[diet_plan]end_date": endValue,
        }

        axios.patch(`https://fitness-bot-avion.herokuapp.com/api/v1/diet_plans/${props.selected?.id}`, qs.stringify(credentials), {
                headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
            })
            .then( (res) => { 
                console.log(res)
                setUserSelectedDietPlan(res.data.data.diet_plan)
                setIsLoading(false)
                setError(false)
            })
            .catch( (error) => {
                console.log(error.response?.data.error)
                setIsLoading(false) 
                setError(true)
                setErrorMessage(error.response?.data.error)
            })
    }

    return(
        <CenteredModalLight onClose={props.onClose}>
                <Card className={classes.card} elevation={1}>
                <Typography variant="subtitle1" component="div" className={classes.header}>Update your diet plan</Typography>
                <TextField 
                    id="selected-title" 
                    label="Title" 
                    variant="outlined" 
                    defaultValue={props.selected?.title} 
                    className={classes.titleInput}
                    onChange={ (e) => setFormData({...formData, title: e.target.value})}
                />
                <TextareaAutosize
                    aria-label="selected-description"
                    minRows={5}
                    defaultValue={props.selected?.description}
                    className={classes.titleDescription}
                    onChange={ (e) => setFormData({...formData, description: e.target.value})}
                />
                <div className={classes.dates}>
                    <div className={classes.dates_content}>
                        <FormGroup className={classes.dateGroup}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Start Date"
                                    value={startValue}
                                    onChange={(newValue) => {
                                    setStartValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    className={classes.rightFormInputs}
                                />
                            </LocalizationProvider>
                        </FormGroup>
                        <FormGroup className={classes.dateGroup2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="End Date"
                                    value={endValue}
                                    onChange={(newValue) => {
                                    setEndValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    className={classes.rightFormInputs}
                                />
                            </LocalizationProvider>
                        </FormGroup>
                    </div>
                </div>
                <Button variant="contained" className={classes.addButton} onClick={submitHandler}>{isLoading ? <LoadingSpinner/> : 'Update details'}</Button>
            </Card>
        </CenteredModalLight>
    )
}

export default UpdateDietPlanSelected;