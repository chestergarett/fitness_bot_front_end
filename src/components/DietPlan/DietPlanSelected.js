//dependencies
import moment from 'moment';
//css
import classes from './DietPlanSelected.module.css';
//material
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
const DietPlanSelected = (props) => {

    return(
        <Card className={classes.card}>
            <Typography variant="h4" component="div">{props.selected.title}</Typography>
            <Typography variant="subtitle1" component="div">{props.selected.description}</Typography>
            <div className={classes.dates}>
                <CalendarTodayIcon/>
                <div className={classes.dates_content}>
                    <Typography variant="caption" display="span">Start: {moment(props.selected.created_at).format('MMM DD YYYY')}</Typography>
                    <Typography variant="caption" display="span">End: {moment(props.selected.end_date).format('MMM DD YYYY')}</Typography>
                </div>
            </div>
        </Card>
    )
}

export default DietPlanSelected;