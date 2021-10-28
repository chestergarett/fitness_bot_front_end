//dependencies
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
//css
import classes from './AddFood.module.css';
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

const AddFood = (props) => {
    const [startValue, setStartValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = () => {
        
    }

    return (
        <CenteredModalLighter onClose={props.onClose}>
            <Card key={v4()} className={classes.card}>
                <div>
                    <Typography className={classes.header} variant="subtitle2" component="div">
                                    {props.data.label}
                    </Typography>
                    <CardMedia
                        component="img"
                        alt={props.data.label}
                        height="200"
                        image={props.data.image}
                        className={classes.image}
                    />
                </div>
                <div>
                    <Typography variant="button">Ingredients</Typography>
                    <List className={classes.list}>
                        {props.data.ingredientLines.map(il => {
                            return(
                                <TextField id={v4()} key={v4()} variant="outlined" defaultValue={il}/>
                            )
                        })}
                    </List>                                
                </div>
                <div>
                    <TextField variant="outlined" label="Calories" className={classes.heading} defaultValue={parseFloat(props.data.calories).toFixed(2)}/>
                    <TextField variant="outlined" label="Weight" className={classes.heading} defaultValue={parseFloat(props.data.totalWeight).toFixed(2)}/>
                    <div className={classes.subHeadingContainer}>
                        <TextField variant="outlined"  label="Meal Type" className={classes.subHeading} defaultValue={props.data.mealType[0]}/>
                        <TextField variant="outlined"  label="Dish Type" className={classes.subHeading} defaultValue={props.data.dishType[0]}/>
                    </div>
                </div>
                <div>
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
                </div>
                <Button variant="contained" color="success" className={classes.addButton} onClick={submitHandler}>{isLoading ? <LoadingSpinner/> : 'Add Food to your Diet'}</Button>
            </Card>
        </CenteredModalLighter>
    )
}

export default AddFood;