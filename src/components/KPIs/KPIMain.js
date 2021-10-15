//css
import classes from './KPIMain.module.css';
//material
import Paper from '@mui/material/Paper';
//components
import WeightKPI from './WeightKPI';
import CalorieKPI from './CalorieKPI';
import WorkoutKPI from './WorkoutKPI';
import TargetKPI from './TargetKPI';

const KPIMain = () => {
    return (
        <Paper elevation={0} style={{display: 'flex', justifyContent: 'center'}}>
            <WeightKPI />
            <CalorieKPI/>
            <WorkoutKPI/>
            <TargetKPI/>
        </Paper>
    )
}

export default KPIMain;