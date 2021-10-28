//dependencies
import { useState, useContext } from 'react';
import qs from 'qs';
import axios from 'axios';
//components
import RightPopupModal from '../Modals/RightPopupModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './UpdateFoodOptions.module.css';
//material
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//icons
import { GiHamburger } from 'react-icons/gi'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const initialState = {
    ingredients: '',
    calories: '',
    excluded: '',
    mainIngredient: '',
}

const UpdateFoodOptions = (props) => {
    const [mealType, setMealType] = useState('Dinner');
    const [dishType, setDishType] = useState('Main course');
    const [dietType, setDietType] = useState('balanced');
    const [cuisineType, setCuisineType] = useState('American');
    const [healthLabel, setHealthLabel] = useState('celery-free');
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userHeaders } = useContext(UserContext);

    const mealTypeHander = (event) => {
        setMealType(event.target.value);
    };

    const dishTypeHandle = (event) => {
        setDishType(event.target.value);
    };

    const dietTypeHandler = (event) => {
        setDietType(event.target.value);
    }

    const cuisineTypeHandler = (event) => {
        setCuisineType(event.target.value);
    }

    const healthLabelHandler = (event) => {
        setHealthLabel(event.target.value);
    }

    const submitHandler = () => {
        const credentials = {
            "food_option[meal_type]": mealType,
            "food_option[dish_type]": dishType,
            "food_option[diet_type]": dietType,
            "food_option[health_label]": healthLabel,
            "food_option[cuisine_type]": cuisineType,
            "food_option[main_ingredient]": formData.mainIngredient,
            "food_option[no_of_ingredients]": formData.ingredients,
            "food_option[calories]": formData.calories,
            "food_option[excluded]": formData.excluded,
        }
        setIsLoading(true)
        axios.patch(`https://fitness-bot-avion.herokuapp.com/api/v1/food_options/${props.foodOptionId}`, qs.stringify(credentials), {
                headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
            })
            .then( (res) => { 
                console.log(res)
                props.handleFoodOptions(res)
                setIsLoading(false)
                setError(false)
            })
            .catch( (error) => {
                setIsLoading(false) 
                setError(true)
                setErrorMessage(error.response?.data.error)
            })
    }

    return (
        <RightPopupModal onClose={props.onClose}>
            <Box className={classes.box} elevation={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.icons}>
                        <GiHamburger size={40} style={{color: '#EE4035'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="div" className={classes.header}>Specify your needs</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.selectContainer}>
                        <InputLabel id="meal-type-label">Meal Type</InputLabel>
                        <Select
                        labelId="meal-type-label"
                        id="meal-type"
                        value={mealType}
                        onChange={mealTypeHander}
                        className={classes.select}
                        >
                            <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
                            <MenuItem value={'Lunch'}>Lunch</MenuItem>
                            <MenuItem value={'Dinner'}>Dinner</MenuItem>
                            <MenuItem value={'Snack'}>Snack</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel id="dish-type-label">Dish Type</InputLabel>
                        <Select
                        labelId="dish-type-label"
                        id="dish-type"
                        value={dishType}
                        onChange={dishTypeHandle}
                        className={classes.select}
                        >
                            <MenuItem value={'Biscuits and cookies'}>Biscuits and cookies</MenuItem>
                            <MenuItem value={'Bread'}>Bread</MenuItem>
                            <MenuItem value={'Cereals'}>Cereals</MenuItem>
                            <MenuItem value={'Condiments and sauces'}>Condiments and sauces</MenuItem>
                            <MenuItem value={'Desserts'}>Desserts</MenuItem>
                            <MenuItem value={'Drink'}>Drink</MenuItem>
                            <MenuItem value={'Main course'}>Main course</MenuItem>
                            <MenuItem value={'Pancake'}>Pancake</MenuItem>
                            <MenuItem value={'Pancakes'}>Pancakes</MenuItem>
                            <MenuItem value={'Preserve'}>Preserve</MenuItem>
                            <MenuItem value={'Salad'}>Salad</MenuItem>
                            <MenuItem value={'Sandwiches'}>Sandwiches</MenuItem>
                            <MenuItem value={'Side dish'}>Side dish</MenuItem>
                            <MenuItem value={'Soup'}>Soup</MenuItem>
                            <MenuItem value={'Starter'}>Starter</MenuItem>
                            <MenuItem value={'Sweets'}>Sweets</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel id="diet-type-label">Diet Type</InputLabel>
                        <Select
                        labelId="diet-type-label"
                        id="diet-type"
                        value={dietType}
                        onChange={dietTypeHandler}
                        className={classes.select}
                        >
                            <MenuItem value={'balanced'}>Balanced</MenuItem>
                            <MenuItem value={'high-fiber'}>High Fiber</MenuItem>
                            <MenuItem value={'high-protein'}>High Protein</MenuItem>
                            <MenuItem value={'low-carb'}>Low Carb</MenuItem>
                            <MenuItem value={'low-fat'}>Low Fat</MenuItem>
                            <MenuItem value={'low-sodium'}>Low Sodium</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel id="cuisine-type-label">Cuisine Type</InputLabel>
                        <Select
                        labelId="cuisine-type-label"
                        id="cuisine-type"
                        value={cuisineType}
                        onChange={cuisineTypeHandler}
                        className={classes.select}
                        >
                            <MenuItem value={'American'}>American</MenuItem>
                            <MenuItem value={'Asian'}>Asian</MenuItem>
                            <MenuItem value={'British'}>British</MenuItem>
                            <MenuItem value={'Caribbean'}>Caribbean</MenuItem>
                            <MenuItem value={'Central Europe'}>Central Europe</MenuItem>
                            <MenuItem value={'Eastern Europe'}>Eastern Europe</MenuItem>
                            <MenuItem value={'French'}>French</MenuItem>
                            <MenuItem value={'Indian'}>Indian</MenuItem>
                            <MenuItem value={'Italian'}>Italian</MenuItem>
                            <MenuItem value={'Japanese'}>Japanese</MenuItem>
                            <MenuItem value={'Kosher'}>Kosher</MenuItem>
                            <MenuItem value={'Mediterranean'}>Mediterranean</MenuItem>
                            <MenuItem value={'Mexican'}>Mexican</MenuItem>
                            <MenuItem value={'Middle Eastern'}>Middle Eastern</MenuItem>
                            <MenuItem value={'Nordic'}>Nordic</MenuItem>
                            <MenuItem value={'South American'}>South American</MenuItem>
                            <MenuItem value={'South East Asian'}>South East Asian</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="no-of-ingredients" 
                            label="# of Ingredients" 
                            variant="outlined" 
                            type="number" 
                            onChange={(e)=>{setFormData({...formData, ingredients: e.target.value})}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="calories" 
                            label="Calories" 
                            variant="outlined" 
                            type="number"
                            onChange={(e)=>{setFormData({...formData, calories: e.target.value})}}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.selectContainer}>
                        <InputLabel id="health-type-label">Health Label</InputLabel>
                        <Select
                        labelId="health-type-label"
                        id="health-label"
                        value={healthLabel}
                        onChange={healthLabelHandler}
                        className={classes.select}
                        >
                            <MenuItem value={'alcohol-free'}>Alcohol Free</MenuItem>
                            <MenuItem value={'celery-free'}>Celery Free</MenuItem>
                            <MenuItem value={'crustacean-free'}>Crustacean Free</MenuItem>
                            <MenuItem value={'dairy-free'}>Dairy Free</MenuItem>
                            <MenuItem value={'egg-free'}>Egg Free</MenuItem>
                            <MenuItem value={'fish-free'}>Fish Free</MenuItem>
                            <MenuItem value={'fodmap-free'}>Fodmap Free</MenuItem>
                            <MenuItem value={'gluten-free'}>Gluten Free</MenuItem>
                            <MenuItem value={'immuno-supportive'}>Immuno Supportive</MenuItem>
                            <MenuItem value={'keto-friendly'}>Keto Friendly</MenuItem>
                            <MenuItem value={'kidney-friendly'}>Kidney Friendly</MenuItem>
                            <MenuItem value={'kosher'}>Kosher</MenuItem>
                            <MenuItem value={'low-potassium'}>Low Potassium</MenuItem>
                            <MenuItem value={'low-sugar'}>Low Sugar</MenuItem>
                            <MenuItem value={'lupine-free'}>Lupine Free</MenuItem>
                            <MenuItem value={'mollusk-free'}>Mollusk Free</MenuItem>
                            <MenuItem value={'mustard-free'}>Mustard Free</MenuItem>
                            <MenuItem value={'no-oil-added'}>No oil added</MenuItem>
                            <MenuItem value={'paleo'}>Paleo</MenuItem>
                            <MenuItem value={'peanut-free'}>Peanut Free</MenuItem>
                            <MenuItem value={'pork-free'}>Pork Free</MenuItem>
                            <MenuItem value={'sesame-free'}>Sesame Free</MenuItem>
                            <MenuItem value={'shellfish-free'}>Shellfish Free</MenuItem>
                            <MenuItem value={'soy-free'}>Soy Free</MenuItem>
                            <MenuItem value={'tree-nut-free'}>Treenut Free</MenuItem>
                            <MenuItem value={'vegan'}>Vegan</MenuItem>
                            <MenuItem value={'vegetarian'}>Vegetarian</MenuItem>
                            <MenuItem value={'wheat-free'}>Wheat Free</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6} className={classes.selectContainer}>
                        <TextField 
                            id="main_ingredient" 
                            label="Main Ingredient" 
                            variant="outlined" 
                            onChange={(e)=>{setFormData({...formData, mainIngredient: e.target.value})}}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.selectContainer}>
                        <TextField 
                            id="excluded" 
                            label="Excluded" 
                            variant="outlined" 
                            onChange={(e)=>{setFormData({...formData, excluded: e.target.value})}}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
                        <Button variant="contained" className={classes.button} onClick={submitHandler}>{isLoading ? <LoadingSpinner/> : 'Update'}</Button>
                    </Grid>
                </Grid>
            </Box>
        </RightPopupModal>
    )
}

export default UpdateFoodOptions;