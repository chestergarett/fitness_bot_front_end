//dependencies
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//css
import classes from './DashboardMain.module.css';
//context
import UserContext from '../../context/user-context';
//components
import Drawer from '../Drawer/Drawer';
import KPIMain from '../KPIs/KPIMain';
import DashboardColumn from './DashboardColumn';
import DashboardPie from './DashboardPie';
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

const DashboardMain = () => {

    const { userHeaders,refresh } = useContext(UserContext);
    const [ kpi, setKpi ] = useState({
        calorie_intake: 0,
        target_weight: 0,
        workout_count: 0,
        weight: 0
    })
    const [workoutPie, setWorkoutPie] = useState([])
    const [workoutStatus, setWorkoutStatus] = useState([])

    useEffect(() => {
        axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/dashboards', {
            headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders'))
        })
        .then((res)=> {
            setKpi({...kpi, calorie_intake: res.data.calorie_intake, target_weight: res.data.target_weight, workout_count: res.data.workout_count, weight: res.data.weight})
            setWorkoutPie(res.data.workout_pie)
            setWorkoutStatus(res.data.workout_status)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[refresh])

    return(
        <Drawer>
            <DrawerHeader/>
            <KPIMain kpi={kpi}/>
            <DrawerHeader/>
            <div className={classes.charts}>
                <div style={{marginRight: '1rem'}}>
                    <DashboardColumn workoutStatus={workoutStatus}/>
                </div>
                <div>
                <DashboardPie workoutPie={workoutPie} />
                </div>
            </div>
            <DrawerHeader/>
        </Drawer>
    )
}

export default DashboardMain;