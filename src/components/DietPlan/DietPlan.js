//dependencies
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//context
import UserContext from '../../context/user-context.js';
//components
import Drawer from '../Drawer/Drawer';
import DietPlanSelected from './DietPlanSelected';
import DietTracker from '../Tracker/DietTracker';
import FoodOptions from './FoodOptions';
//css
import classes from './DietPlan.module.css';
//material
import { styled } from '@mui/material/styles';
import  Divider  from '@mui/material/Divider';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DietPlan = () => {
    
    const { userHeaders, 
        userDietPlans, 
        setUserDietPlans,
        userSelectedDietPlan, 
        setUserSelectedDietPlan,
        userFoodOptions, 
        setFoodOptions, 
        userFoods, 
        setFoods } = useContext(UserContext);
    
    useEffect( ()=> {
        axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/diet_plans', 
        { headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')) })
        .then((res)=>  {
            setUserDietPlans(res.data.data);
            setUserSelectedDietPlan(res.data.data[0]);
        })
        .catch((error)=> console.log(error))
    }, [])
    
    return(
        <Drawer>
            <DrawerHeader />
            <div className={classes.section}>
                <div className={classes.main}>
                    <DietTracker className={classes.calendar}/>
                    <DietPlanSelected selected={userSelectedDietPlan} className={classes.card}/>
                </div>
                <FoodOptions dietPlan={userSelectedDietPlan.id}/>
            </div>
        </Drawer>
    )       
}

export default DietPlan;