//dependencies
import { useState } from 'react';
import moment from 'moment';
//css
import classes from './DietPlanSelected.module.css';
//components
import UpdateDietPlanSelected from './UpdateDietPlanSelected';
//material
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
//icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';

const DietPlanSelected = (props) => {

    const [update, setUpdate] = useState(false);

    const openUpdateHandler = () => {
        setUpdate(true)
    }

    const closeUpdateHandler = () => {
        setUpdate(false)
    }

    return(
        <>
        <Card className={classes.card}>
            <Typography variant="h5" component="div" className={classes.title}>{
                props.selected?.title}
                <span className={classes.mainHeaderIcons}>
                    <EditIcon style={{fontSize: '20px', marginLeft: '.5rem', cursor: 'pointer'}} onClick={openUpdateHandler}/>
                </span>
            </Typography>
            <Typography variant="subtitle1" component="div">
                {props.selected?.description}
            </Typography>
            <div className={classes.dates}>
                <CalendarTodayIcon/>
                <div className={classes.dates_content}>
                    <Typography variant="caption" display="span">Start: {moment(props.selected?.created_at).format('MMM DD YYYY')}</Typography>
                    <Typography variant="caption" display="span">End: {moment(props.selected?.end_date).format('MMM DD YYYY')}</Typography>
                </div>
            </div>
        </Card>
        {update ? <UpdateDietPlanSelected onClose={closeUpdateHandler} selected={props.selected}/> : ''}
        </>
    )
}

export default DietPlanSelected;