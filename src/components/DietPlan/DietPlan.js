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
        setUserDietPlans,
        userSelectedDietPlan, 
        setUserSelectedDietPlan,
        refresh
         } = useContext(UserContext);
    
    useEffect( ()=> {
        axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/diet_plans', 
        { headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')) })
        .then((res)=>  {
            setUserDietPlans(res.data.data);
            setUserSelectedDietPlan(res.data.data[res.data.data.length-1]);
            if(userSelectedDietPlan.id!==undefined){
                localStorage.setItem('userSelectedDietPlan', userSelectedDietPlan.id)
            }
            console.log(res.data.data[res.data.data.length-1])
        })
        .catch((error)=> console.log(error))
    }, [refresh])
    
    return(
        <Drawer>
            <DrawerHeader />
            <div className={classes.section}>
                <div className={classes.main}>
                    <DietTracker className={classes.calendar} dietPlan={localStorage.getItem('userSelectedDietPlan')!==null ? localStorage.getItem('userSelectedDietPlan') : userSelectedDietPlan.id}/>
                    <DietPlanSelected selected={userSelectedDietPlan} className={classes.card}/>
                </div>
                <FoodOptions dietPlan={localStorage.getItem('userSelectedDietPlan')!==null ? localStorage.getItem('userSelectedDietPlan') : userSelectedDietPlan.id}/>
            </div>
        </Drawer>
    )       
}

export default DietPlan;