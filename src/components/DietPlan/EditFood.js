//dependencies
import { useState, useContext } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import qs from 'qs';
//css
import classes from './EditFood.module.css';
//context
import UserContext from '../../context/user-context.js';
//components
import ModalEditFood from "../Modals/ModalEditFood";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
//material
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const EditFood = (props) => {

    const { userHeaders } = useContext(UserContext);

    const initialState = {
        calories: props.event.calories,
        totalWeight: props.event.totalWeight,
        dishType: props.event.dishType,
        mealType: props.event.mealType,
    }

    const [startValue, setStartValue] = useState(props.event.start)
    //success
    const [successUpdate, setSuccessUpdate] = useState(false)
    const [successMessageUpdate, setSuccessMessageUpdate] = useState('')
    const [errorUpdate, setErrorUpdate] = useState(false)
    const [errorMessageUpdate,setErrorMessageUpdate] = useState([])
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    //delete
    const [successDelete, setSuccessDelete] = useState(false)
    const [successMessageDelete, setSuccessMessageDelete] = useState('')
    const [errorDelete, setErrorDelete] = useState(false)
    const [errorMessageDelete,setErrorMessageDelete] = useState([])
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    //forms
    const [status, setStatus] = useState('NOT STARTED')
    const [formData, setFormData] = useState(initialState)

    const submitHandler = () => {
        const credentials = {
            "food[mealType]": formData.mealType,
            "food[dishType]": formData.dishType,
            "food[calories]": formData.calories,
            "food[totalWeight]": formData.totalWeight,
            "food[startDate]": startValue,
            "food[status]": status
        }
        setIsLoadingUpdate(true)
        axios.patch(`https://fitness-bot-avion.herokuapp.com/api/v1/foods/${props.event.id}`, qs.stringify(credentials), {
            headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
        })
        .then( (res) => { 
            setSuccessMessageUpdate('Successfully updated workout.')
            setSuccessUpdate(true)
            setErrorUpdate(false)
            setIsLoadingUpdate(false)
            })
        .catch( (err) => {
            console.log(props.event.id)
            setErrorMessageUpdate(err.response?.data.error)
            setIsLoadingUpdate(false) 
            setSuccessUpdate(false)
            setErrorUpdate(true)})
    }

    const deleteHandler = () => {
        setIsLoadingDelete(true)
        axios.delete(`https://fitness-bot-avion.herokuapp.com/api/v1/foods/${props.event.id}`, {
                headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
            })
            .then( (res) => { 
            setSuccessMessageDelete('Successfully deleted workout.')
            setSuccessDelete(true)
            setErrorDelete(false)
            setIsLoadingDelete(false)
            })
            .catch( (err) => {
            setErrorMessageDelete(err.response?.data.errors)
            setIsLoadingDelete(false) 
            setSuccessDelete(false)
            setErrorDelete(true)})
    }

    return (
        <ModalEditFood onClose={props.onClose}>
            <Card key={v4()} className={classes.card}>
                <Typography className={classes.header} variant="subtitle2" component="div">
                            {props.event.title}
                </Typography>
                <div className={classes.details}>
                    <div className={classes.header_and_image}>
                        <CardMedia
                            component="img"
                            alt={props.event.title}
                            height="250"
                            image={props.event.media}
                            className={classes.image}
                        />
                    </div>
                    <div className={classes.ingredients}>
                        <List className={classes.list}>
                            <Typography variant="overline" style={{fontStyle: 'italic'}}>Edit ingredients here</Typography>
                            {props.event.ingredientLines?.map(il => {
                                return(
                                    <TextField id={v4()} key={v4()} variant="outlined" defaultValue={il} style={{width: '80%', marginBottom: '.5rem'}}/>
                                )
                            })}
                        </List>                                
                    </div>
                </div>
                <div className={classes.otherDetails}>
                    <div className={classes.otherDetails_1}>
                        <TextField variant="outlined"  
                            label="Meal Type" 
                            className={classes.subHeading} 
                            defaultValue={props.event.mealType}
                            onChange={(e)=> setFormData({...formData, mealType: e.target.value})}
                        />
                        <TextField 
                            variant="outlined"  
                            label="Dish Type" 
                            className={classes.subHeading} 
                            defaultValue={props.event.dishType}
                            onChange={(e)=> setFormData({...formData, dishType: e.target.value})}
                        />
                    </div>
                    <div className={classes.otherDetails_2}>
                        <div className={classes.datePicker}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Start Date"
                            value={startValue}
                            onChange={(newValue) => {
                            setStartValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            className={classes.dateInput}
                            style={{width: '100%'}}
                        />
                        </LocalizationProvider>
                        </div>
                        <TextField 
                            variant="outlined" 
                            label="Weight" 
                            className={classes.heading} 
                            defaultValue={parseFloat(props.event.totalWeight).toFixed(2)}
                            onChange={(e)=> setFormData({...formData, totalWeight: e.target.value})}
                        />
                    </div>
                </div>
                <div className={classes.otherDetails_3}>
                    <Select
                        labelId="edit-event-status-label"
                        id="edit-event-status"
                        value={status}
                        onChange={ (e) => {setStatus(e.target.value)}}
                        className={classes.selectGroup}
                    >
                        <MenuItem value={'NOT STARTED'}>Not Started</MenuItem>
                        <MenuItem value={'ONGOING'}>Ongoing</MenuItem>
                        <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                    </Select>
                    <TextField 
                        variant="outlined" 
                        label="Calories" 
                        className={classes.heading} 
                        defaultValue={parseFloat(props.event.calories).toFixed(2)}
                        onChange={(e)=> setFormData({...formData, calories: e.target.value})}
                    />
                </div>
                <div className={classes.buttonContainer}>
                {errorUpdate ? <span className={classes.errors}>
                    {errorMessageUpdate.map(e => { return ( <span key={e} className={classes.errorMessages}>{e}</span>) } ) }
                </span> : ''}
                {successUpdate ? <span className={classes.success}>
                    {successMessageUpdate}
                </span> : ''}   
                    <div className={classes.buttonSet}>
                    <Button variant="contained" color="success" className={classes.addButton} onClick={submitHandler}>{isLoadingUpdate ? <LoadingSpinner/> : 'Update'}</Button>
                    <Button variant="contained" color="error" className={classes.addButton} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler(e)}}>{isLoadingDelete ? <LoadingSpinner/> : 'Delete'}</Button>
                        
                    </div>
                </div>
            </Card>
        </ModalEditFood>
    )
}

export default EditFood;