//components
import Drawer from '../Drawer/Drawer';
import SearchWorkout from './SearchWorkout';
import Tracker from '../Tracker/Tracker';
//css
import classes from './WorkoutPlan.module.css';
//material
import { styled, useTheme } from '@mui/material/styles';
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
    return(
        <Drawer>
            <DrawerHeader />
            <SearchWorkout />
            <Divider className={classes.divider}/>
            <Tracker/>
        </Drawer>
    )       
}

export default WorkoutPlan;