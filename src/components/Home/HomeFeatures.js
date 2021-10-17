//css
import classes from './HomeFeatures.module.css';
import fitness from '../../assets/features_fitness.svg';
import diet from '../../assets/features_diet.svg';
import time from '../../assets/features_time.svg';
import mentor from '../../assets/features_mentor.svg';
//material
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const data = [
    {
        id: 'fitness-card',
        heading: 'Fitness at your hands.',
        subHeading: 'With our varied array of routine exercises, you will be at the best shape of your life.',
        image: fitness,
        
    },
    {
        id: 'time-card',
        heading: 'Track your progress.',
        subHeading: 'Our state of the art record keeping interface will allow you to track your goals easily.',
        image: time,
    },
    {
        id: 'diet-card',
        heading: 'Monitor your calories.',
        subHeading: 'With our recommended diet plans, reaching your fitness goals has never been easy.',
        image: diet,
        
    },
    {
        id: 'master-card',
        heading: 'Ask help from the coaches.',
        subHeading: 'We know it\'s hard to do it alone. We have dedicated mentors to help you!',
        image: mentor,
    },
]

const HomeFeatures = () => {
    return (
        <Paper elevation={0} className={classes.tray}>
            {data.map(
                d => {
                    return (<Card sx={{ width: 300 }} className={classes.card} key={d.id} id={d.id}>
                                <Typography variant="h6" component="div" className={classes.heading}>
                                        {d.heading}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={d.image}
                                    alt={d.id}
                                    className={classes.image}
                                />
                                <CardContent>
                                    <Typography variant="body2" component="div" className={classes.subHeading}>
                                        {d.subHeading}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small"> Subscribe</Button>
                                </CardActions>
                            </Card>)
                }
            )}
        </Paper>
    )
}

export default HomeFeatures;