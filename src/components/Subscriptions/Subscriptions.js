//css
import classes from './Subscriptions.module.css';

//components
import CenteredModal from '../Modals/CenteredModal';

//material
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

//icons
import { GrGift } from 'react-icons/gr'

const Subscriptions = ( props ) => {
    return(
        <CenteredModal onClose={props.onClose}>
            <Paper elevation={0} style={{background: 'whitesmoke'}}>
                <Typography variant='h5'>Choose your plan</Typography>
                <Typography variant='outline'>Choose the package that is best for you on the journey to fit lifestyle.</Typography>
                <Box className={classes.box}>
                    <Card className={classes.card}>
                        <Typography variant='h5'>Free Plan</Typography>
                        <GrGift style={{fontSize: '30px'}}/>
                        <Typography variant='h6'>Unlimited Access to Diet Plans</Typography>
                        <Typography variant='h6'>Unlimited Access to Workout Plans</Typography>
                        <Typography variant='h6'>Works on All devices</Typography>
                        <Typography variant='h4'>Free</Typography>
                        <Button color="inherit" className={classes.button2}>Subscribe</Button>
                    </Card>
                    <Card className={classes.card}> Plan 2</Card>
                    <Card className={classes.card}>Plan 3</Card>
                </Box>
            </Paper>
        </CenteredModal>
    )
}

export default Subscriptions;