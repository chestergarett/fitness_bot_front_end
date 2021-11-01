//dependencies
import { useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './EditWorkout.module.css'
//components
import CenteredModalLight from '../Modals/CenteredModalLight';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
//material
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';


const EditWorkout = (props) => {
    
    const { userHeaders, setRefresh } = useContext(UserContext);

    const initialState = {
        reps: props.event.reps,
        sets: props.event.sets,
    }


    const [startValue, setStartValue] = useState(props.event.start);
    const [endValue, setEndValue] = useState(props.event.end);
    const [status, setStatus] = useState(props.event.status)
    const [errorUpdate, setErrorUpdate] = useState(false)
    const [errorDelete, setErrorDelete] = useState(false)
    const [successUpdate, setSuccessUpdate] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)
    const [successMessageUpdate, setSucessMessageUpdate] = useState([])
    const [successMessageDelete, setSucessMessageDelete] = useState([])
    const [errorMessageUpdate, setErrorMessageUpdate] = useState([])
    const [errorMessageDelete, setErrorMessageDelete] = useState([])
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [formData, setFormData] = useState(initialState);

    const updateHandler = () => {
        const credentials = {
            "workout_plan[startDate]": `${startValue}`,
            "workout_plan[endDate]": `${endValue}`,
            "workout_plan[status]": `${status}`,
            "workout_plan[reps]": `${formData.reps}`, 
            "workout_plan[sets]": `${formData.sets}`, 
        
        }
            setIsLoadingUpdate(true)
            axios.patch(`https://fitness-bot-avion.herokuapp.com/api/v1/workout_plans/${props.event.id}`, qs.stringify(credentials), {
                headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
            })
            .then( (res) => { 
            setSucessMessageUpdate('Successfully updated workout.')
            setSuccessUpdate(true)
            setErrorUpdate(false)
            setIsLoadingUpdate(false)
            setRefresh(new Date())
            })
            .catch( (err) => {
            setErrorMessageUpdate(err.response?.data.errors)
            setIsLoadingUpdate(false) 
            setSuccessUpdate(false)
            setErrorUpdate(true)})
    }

    const deleteHandler = () => {
        axios.delete(`https://fitness-bot-avion.herokuapp.com/api/v1/workout_plans/${props.event.id}`, {
                headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
            })
            .then( (res) => { 
            setSucessMessageDelete('Successfully deleted workout.')
            setSuccessDelete(true)
            setErrorDelete(false)
            setIsLoadingDelete(false)
            setRefresh(new Date())
            })
            .catch( (err) => {
            setErrorMessageDelete(err.response?.data.errors)
            setIsLoadingDelete(false) 
            setSuccessDelete(false)
            setErrorDelete(true)})
    }

    
    
    return (
        <>
        {!successDelete ?
        <CenteredModalLight onClose={props.onClose}>
            <div className={classes.divBeforeForm}>
                <FormControl className={classes.leftForm}>
                    <Typography className={classes.header} component="div">
                            {props.event.title}
                    </Typography>
                    <Typography className={classes.subheading} component="span">
                            {props.event.type}
                    </Typography>
                    <CardMedia
                        component="img"
                        alt={props.event.title}
                        height="150"
                        image={props.event.gifUrl}
                        className={classes.image}
                        />
                    <CardContent>
                        <div className={classes.labelGroup}>
                            <span className={classes.keyLabel}>Equipment &nbsp;</span>
                            <span className={classes.valueLabel}>{props.event.equipment} </span>
                        </div>
                        <div className={classes.labelGroup}>
                            <span className={classes.keyLabel}>Target &nbsp;</span>
                            <span className={classes.valueLabel}>{props.event.target} </span>
                        </div>
                        <div className={classes.labelGroup}>
                            <span className={classes.keyLabel}>Body Part &nbsp;</span>
                            <span className={classes.valueLabel}>{props.event.bodyPart} </span>
                        </div>
                    </CardContent>
                </FormControl>
                <FormControl className={classes.rightForm}>
                    <FormGroup className={classes.selectGroup}>
                        <InputLabel id="edit-event-status-label">Status</InputLabel>
                        <Select
                        labelId="edit-event-status-label"
                        id="edit-event-status"
                        value={status}
                        label="Status"
                        onChange={ (e) => {setStatus(e.target.value)}}
                        >
                            <MenuItem value={'NOT STARTED'}>Not Started</MenuItem>
                            <MenuItem value={'ONGOING'}>Ongoing</MenuItem>
                            <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                        </Select>
                    </FormGroup>
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
                    <TextField id="reps_input" label="Reps" type="number" InputLabelProps={{shrink: true,}} className={classes.rightTextFields} onChange={ (e) => setFormData({...formData, reps: e.target.value})} defaultValue={props.event.reps}/>
                    <TextField id="sets_input" label="Sets" type="number" InputLabelProps={{shrink: true,}} className={classes.rightTextFields} onChange={ (e) => setFormData({...formData, sets: e.target.value})} defaultValue={props.event.sets}/>
                </FormControl>
            </div>
            {errorUpdate ? <span className={classes.errors}>
                {errorMessageUpdate.map(e => { return ( <span key={e} className={classes.errorMessages}>{e}</span>) } ) }
            </span> : ''}
            {successUpdate ? <span className={classes.success}>
                {successMessageUpdate}
            </span> : ''}
            <FormControl className={classes.buttonGroup}>   
                <Button variant="contained" color="success" className={classes.addButton} onClick={updateHandler} className={classes.buttonSingle}>{isLoadingUpdate ? <LoadingSpinner/> : 'Update'}</Button>
                <Button variant="contained" color="error" className={classes.addButton} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler(e)}} className={classes.buttonSingle}>{isLoadingDelete ? <LoadingSpinner/> : 'Delete'}</Button>
            </FormControl>
        </CenteredModalLight> : <div className={classes.snackbar}>{successMessageDelete}</div> } 
        </>
    )
}

export default EditWorkout;