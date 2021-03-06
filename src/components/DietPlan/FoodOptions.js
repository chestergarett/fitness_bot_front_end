//dependencies
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { v4 } from 'uuid';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './FoodOptions.module.css';
//components
import LoadingSpinnerDark from '../LoadingSpinner/LoadingSpinnerDark';
import UpdateFoodOptions from './UpdateFoodOptions';
import AddFood from './AddFood';
//material
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Collapse from '@mui/material/Collapse';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

const FoodOptions = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSucessMessage] = useState(false);
    const [error, setError] = useState(false);
    const [recipes, setRecipes] = useState([])
    const [recipe, setRecipe] = useState({});
    const [errorMessage, setErrorMessage] = useState(false);
    const [addFood, setAddFood] = useState(false)
    const [update, setUpdate] = useState(false);
    const [foodOption, setFoodOption] = useState(null)
    const { userHeaders, userSelectedDietPlan } = useContext(UserContext);

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const openUpdateHandler = () => {
        setUpdate(true)
    }

    const closeUpdateHandler = () => {
        setUpdate(false)
    }

    const openAddFoodHandler = (r) => {
        setAddFood(true)
        setRecipe(r)
    }

    const closeAddFoodHandler = () => {
        setAddFood(false)
    }

    const initialState = {
        "food_option[diet_plan_id]": userSelectedDietPlan.id,
        "food_option[meal_type]": 'Dinner',
        "food_option[dish_type]": 'Main course',
        "food_option[diet_type]": 'balanced',
        "food_option[health_label]": 'celery-free',
        "food_option[cuisine_type]": 'American',
        "food_option[main_ingredient]": 'Chicken',
        "food_option[no_of_ingredients]": 8,
        "food_option[calories]": 400,
        "food_option[excluded]": 'Oyster',
    }

    useEffect( ()=> {
            setIsLoading(true)
            axios.post('https://fitness-bot-avion.herokuapp.com/api/v1/food_options', qs.stringify(initialState), {
                headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
            })
            .then( (res) => { 
            setFoodOption(res.data.data.id)
            setRecipes(res.data.recipes)
            setSuccess(true)
            setError(false)
            setIsLoading(false)
            })
            .catch( (err) => {
            setErrorMessage(err.response?.data.errors)
            setIsLoading(false) 
            setSuccess(false)
            setError(true)})
    }, [userSelectedDietPlan])

    const handleFoodOptions = (res) => {
        setRecipes(res.data.recipes)
    }

    return (
        <Paper elevation={1} className={classes.main}>
            <Typography variant="outline" component="div" className={classes.mainHeader}>
                FOOD OPTIONS 
                <span className={classes.mainHeaderIcons}><EditIcon style={{fontSize: '20px', marginLeft: '.5rem', cursor: 'pointer'}} onClick={openUpdateHandler}/></span>
            </Typography>
            <div className={!isLoading ? classes.section : classes.loading}>
            {isLoading ? <LoadingSpinnerDark/> : 
                recipes.map(r=> { 
                return(
                    <>
                    <Card key={v4()} className={classes.card}>
                        <div onClick={()=>{openAddFoodHandler(r)}} className={classes.modalOpen}>
                            <CardMedia
                                component="img"
                                alt={r.label}
                                height="200"
                                image={r.recipe.image}
                                className={classes.image}
                            />
                            <Typography className={classes.header} variant="subtitle2" component="div">
                                {r.recipe.label}
                            </Typography>
                        </div>
                        <CardContent>
                            <Typography variant="button">Ingredients</Typography>
                            <List className={classes.list}>
                                {r.recipe.ingredientLines.map(il => {
                                    return(
                                        <ListItem key={v4()}><Typography variant="caption" component="span">{il}</Typography></ListItem>
                                    )
                                })}
                            </List>                                
                        </CardContent>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant="button" component="div" className={classes.heading}>{parseFloat(r.recipe.calories).toFixed(2)} <span className={classes.label}>calories</span></Typography>
                                <Typography variant="button"  component="div" className={classes.heading}>{parseFloat(r.recipe.totalWeight).toFixed(2)} <span className={classes.label}>weight</span></Typography>
                                <div className={classes.subHeadingContainer}>
                                    <Typography variant="outline"  component="div" className={classes.subHeading}>{r.recipe.mealType[0]} </Typography>
                                    <Typography variant="outline"  component="div" className={classes.subHeading}>{r.recipe.dishType[0]} </Typography>
                                </div>
                            </CardContent>
                        </Collapse>
                    </Card>
                    </>
                )
            })}
            </div>
            {addFood ? <AddFood onClose={closeAddFoodHandler} data={recipe.recipe} foodOptionId={foodOption}/> : ''}
            {update ? <UpdateFoodOptions onClose={closeUpdateHandler} foodOptionId={foodOption} handleFoodOptions={(res)=>{handleFoodOptions(res)}}/> : ''}
        </Paper>
    )
}

export default FoodOptions;