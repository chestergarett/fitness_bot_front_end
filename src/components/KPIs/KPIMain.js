//material
import Paper from '@mui/material/Paper';
//components
import WeightKPI from './WeightKPI';
import CalorieKPI from './CalorieKPI';
import WorkoutKPI from './WorkoutKPI';
import TargetKPI from './TargetKPI';

const KPIMain = (props) => {

    return (
        <Paper elevation={0} style={{display: 'flex', justifyContent: 'center'}}>
            <WeightKPI kpi={props.kpi.weight}/>
            <CalorieKPI kpi={props.kpi.calorie_intake}/>
            <WorkoutKPI kpi={props.kpi.workout_count}/>
            <TargetKPI kpi={props.kpi.target_weight}/>
        </Paper>
    )
}

export default KPIMain;