//dependencies
import { useState, useContext } from 'react';
import { useHistory }  from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './AddWorkout.module.css';
//components
import CenteredModalLight from '../Modals/CenteredModalLight';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
//material
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';

const initialState = {
    reps: '',
    sets: '',
}

const AddWorkout = (props) => {
    
    const { userHeaders, refresh, setRefresh } = useContext(UserContext);
    const [startValue, setStartValue] = useState(null);
    const [endValue, setEndValue] = useState(null);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSucessMessage] = useState([])
    const [errorMessage, setErrorMessage] = useState([])
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false)

    const submitHandler = () => {
        const credentials = {
        "workout_plan[bodyPart]": `${props.result.bodyPart}`, 
        "workout_plan[equipment]": `${props.result.equipment}`, 
        "workout_plan[gifUrl]": `${props.result.gifUrl}`, 
        "workout_plan[workout_id]": `${props.result.workout_id}`, 
        "workout_plan[name]": `${props.result.name}`,
        "workout_plan[target]": `${props.result.target}`,
        "workout_plan[startDate]": `${startValue}`,
        "workout_plan[endDate]": `${endValue}`,
        "workout_plan[status]": `NOT STARTED`,
        "workout_plan[reps]": `${formData.reps}`, 
        "workout_plan[sets]": `${formData.sets}`, 
    
    }
        setIsLoading(true)
        axios.post('https://fitness-bot-avion.herokuapp.com/api/v1/workout_plans', qs.stringify(credentials), {
            headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
        })
        .then( (res) => { 
        setSucessMessage('Successfully added workout.')
        setSuccess(true)
        setError(false)
        setIsLoading(false)
        setRefresh(new Date())
        })
        .catch( (err) => {
        setErrorMessage(err.response?.data.errors)
        setIsLoading(false) 
        setSuccess(false)
        setError(true)})
    }

    return (
        <CenteredModalLight onClose={props.onClose} className={classes.modal}>
            <div className={classes.divBeforeForm}>
                <FormControl className={classes.leftForm}>
                    <Typography className={classes.header} component="div">
                            {props.result.name}
                    </Typography>
                    <CardMedia
                        component="img"
                        alt={props.result.name}
                        height="150"
                        image={props.result.gifUrl}
                        className={classes.image}
                        />
                    <div>
                        <div className={classes.labelGroup}>
                            <span className={classes.keyLabel}>Equipment &nbsp;</span>
                            <span className={classes.valueLabel}>{props.result.equipment} </span>
                        </div>
                        <div className={classes.labelGroup}>
                            <span className={classes.keyLabel}>Target &nbsp;</span>
                            <span className={classes.valueLabel}>{props.result.target} </span>
                        </div>
                        <div className={classes.labelGroup}>
                            <span className={classes.keyLabel}>Body Part &nbsp;</span>
                            <span className={classes.valueLabel}>{props.result.bodyPart} </span>
                        </div>
                    </div>
                </FormControl>
                <FormControl className={classes.rightForm}>
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
                    <FormGroup className={classes.dateGroup}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="End Date"
                                value={endValue}
                                onChange={(newValue) => {
                                setEndValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormGroup>
                    <TextField id="reps_input" label="Reps" type="number" InputLabelProps={{shrink: true,}} className={classes.rightTextFields} onChange={ (e) => setFormData({...formData, reps: e.target.value})}/>
                    <TextField id="sets_input" label="Sets" type="number" InputLabelProps={{shrink: true,}} className={classes.rightTextFields} onChange={ (e) => setFormData({...formData, sets: e.target.value})}/>
                </FormControl>
            </div>
            {error ? <span className={classes.errors}>
                {errorMessage.map(e => { return ( <span key={e} className={classes.errorMessages}>{e}</span>) } ) }
            </span> : ''}
            {success ? <span className={classes.success}>
                {successMessage}
            </span> : ''}   
            <Button variant="contained" color="success" className={classes.addButton} onClick={submitHandler}>{isLoading ? <LoadingSpinner/> : 'Add Workout'}</Button>
        </CenteredModalLight>
    )
}

export default AddWorkout;