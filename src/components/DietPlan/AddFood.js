//dependencies
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import qs from 'qs';
//css
import classes from './AddFood.module.css';
//context
import UserContext from '../../context/user-context.js';
//components
import CenteredModalLighter from "../Modals/CenteredModalLighter";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
//material
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';


const initialState = {
    startDate: '',    
}

const AddFood = (props) => {
    const { userHeaders, userSelectedDietPlan, setRefresh } = useContext(UserContext); 
    const [startValue, setStartValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const submitHandler = () => {
        const credentials = {
            "food[name]": props.data.label,
            "food[ingredients]": `[${JSON.stringify(props.data.ingredientLines)}]`,
            "food[ingredientLines]": `[${JSON.stringify(props.data.ingredientLines)}]`,
            "food[media]": props.data.image,
            "food[mealType]": props.data.mealType[0],
            "food[dishType]": props.data.dishType[0],
            "food[calories]": props.data.calories,
            "food[totalWeight]": props.data.totalWeight,
            "food[startDate]": startValue,
            "food[diet_plan_id]": userSelectedDietPlan.id,
            "food[status]": "NOT STARTED"
        }

        console.log(props.data.ingredientLines)
        setIsLoading(true)
        axios.post(`https://fitness-bot-avion.herokuapp.com/api/v1/foods`, qs.stringify(credentials), {
                headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
            })
            .then( (res) => { 
                console.log(res)
                setIsLoading(false)
                setSuccess(true)
                setError(false)
                setRefresh(new Date())
                setSuccessMessage('Successfully added to diet plan.')
            })
            .catch( (error) => {
                console.log(error.response?.data)
                setIsLoading(false) 
                setSuccess(false)
                setError(true)
                setErrorMessage(error.response?.data.error)
            })
    };

    return (
        <CenteredModalLighter onClose={props.onClose}>
            <Card key={v4()} className={classes.card}>
                <Typography className={classes.header} variant="subtitle2" component="div">
                            {props.data.label}
                </Typography>
                <div className={classes.details}>
                    <div className={classes.header_and_image}>
                        <CardMedia
                            component="img"
                            alt={props.data.label}
                            height="250"
                            image={props.data.image}
                            className={classes.image}
                        />
                    </div>
                    <div className={classes.ingredients}>
                        <List className={classes.list}>
                            <Typography variant="overline" style={{fontStyle: 'italic'}}>Edit ingredients here</Typography>
                            {props.data.ingredientLines.map(il => {
                                return(
                                    <TextField id={v4()} key={v4()} variant="outlined" defaultValue={il} style={{width: '80%', marginBottom: '.5rem'}}/>
                                )
                            })}
                        </List>                                
                    </div>
                    <div className={classes.subHeadingContainer}>
                        
                    </div>
                </div>
                <div className={classes.otherDetails}>
                    <div className={classes.otherDetails_1}>
                        <TextField variant="outlined"  label="Meal Type" className={classes.subHeading} defaultValue={props.data.mealType[0]}/>
                        <TextField variant="outlined"  label="Dish Type" className={classes.subHeading} defaultValue={props.data.dishType[0]}/>
                    </div>
                    <div className={classes.otherDetails_2}>
                        <TextField variant="outlined" label="Calories" className={classes.heading} defaultValue={parseFloat(props.data.calories).toFixed(2)}/>
                        <TextField variant="outlined" label="Weight" className={classes.heading} defaultValue={parseFloat(props.data.totalWeight).toFixed(2)}/>
                    </div>
                </div>
                <div className={classes.otherDetails_3}>
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
                <div className={classes.buttonContainer}>
                {error ? <span className={classes.errors}>
                    {errorMessage.map(e => { return ( <span key={e} className={classes.errorMessages}>{e}</span>) } ) }
                </span> : ''}
                {success ? <span className={classes.success}>
                    {successMessage}
                </span> : ''}   
                <Button variant="contained" color="success" className={classes.addButton} onClick={submitHandler}>{isLoading ? <LoadingSpinner/> : 'Add Food to your Diet'}</Button>
                </div>
            </Card>
        </CenteredModalLighter>
    )
}

export default AddFood;