//dependencies
import { useState, useEffect, useContext } from 'react';
//context
import UserContext from '../../context/user-context.js';
//components
import Drawer from '../Drawer/Drawer';
import SearchWorkout from './SearchWorkout';
import WorkoutTracker from '../Tracker/WorkoutTracker';
//css
import classes from './WorkoutPlan.module.css';
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

const WorkoutPlan = () => {
    
    const { userWorkouts } = useContext(UserContext);
    
    return(
        <Drawer>
            <DrawerHeader />
            <SearchWorkout />
            <Divider className={classes.divider}/>
            <WorkoutTracker />
        </Drawer>
    )       
}

export default WorkoutPlan;