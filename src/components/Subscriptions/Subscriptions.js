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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
//icons
import { AiOutlineGift } from 'react-icons/ai'

const plans = [
    {
        name: 'Free Plan',
        feature_1: true,
        feature_2: false,
        feature_3: false,
        feature_4: false
    },
    {
        name: 'Standard Plan',
        feature_1: true,
        feature_2: true,
        feature_3: false,
        feature_4: false
    },
    {
        name: 'Premium Plan',
        feature_1: true,
        feature_2: true,
        feature_3: true,
        feature_4: true
    },
]
const Subscriptions = ( props ) => {
    return(
        <CenteredModal onClose={props.onClose}>
            <Paper elevation={0} style={{background: 'whitesmoke'}}>
                <Typography variant='h5' className={classes.heading}>Choose your plan</Typography>
                <Typography variant='caption'>Choose the package that is best for you on the journey to a fit lifestyle.</Typography>
                <Box className={classes.box}>
                    {plans.map( p => {
                        return (
                            <Card className={classes.card} key={p.name} id={p.name}>
                                <Typography variant='h6'>{p.name}</Typography>
                                <AiOutlineGift className={classes.icons}/>
                                <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        {p.feature_1 ?
                                        <>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon> 
                                        <ListItemText primary='Unlimited Access to Diet Plans' className={classes.listItemText}/>
                                        </> :
                                        <ListItemText inset primary='Unlimited Access to Diet Plans' className={classes.listItemText}/>
                                        }
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        {p.feature_2 ?
                                        <>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon> 
                                        <ListItemText primary='Unlimited Access to Workout Plans' className={classes.listItemText}/>
                                        </> :
                                        <ListItemText inset primary='Unlimited Access to Workout Plans' className={classes.listItemText}/>
                                        }
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        {p.feature_3 ?
                                        <>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon> 
                                        <ListItemText primary='One on One coaching' className={classes.listItemText}/>
                                        </> :
                                        <ListItemText inset primary='One on One coaching' className={classes.listItemText}/>
                                        }
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        {p.feature_4 ?
                                        <>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon> 
                                        <ListItemText primary='Amazing freebies' className={classes.listItemText}/>
                                        </> :
                                        <ListItemText inset primary='Amazing freebies' className={classes.listItemText}/>
                                        }
                                    </ListItemButton>
                                </ListItem>
                                </List>
                                <Button color="inherit" className={classes.button2}>Subscribe</Button>
                            </Card>
                        )
                    })}
                </Box>
            </Paper>
        </CenteredModal>
    )
}

export default Subscriptions;