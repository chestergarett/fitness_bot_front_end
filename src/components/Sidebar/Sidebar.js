//dependencies
import { useState, useContext } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import { v4 } from 'uuid';
//css
import classes from './Sidebar.module.css';
//components
import Subscriptions from '../Subscriptions/Subscriptions';
//material
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//icons
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import HelpIcon from '@mui/icons-material/Help';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

const options = [
    {key: v4(), text: 'Home', icon: <HomeIcon className={classes.icons} />, link: '/Home'},
    {key: v4(), text: 'Profile', icon: <AssignmentIndIcon className={classes.icons} />, link: '/Profile'},
    {key: v4(), text: 'Diet Plan', icon: <FastfoodIcon className={classes.icons} />, link: '/DietPlan'},
    {key: v4(), text: 'Workout Plan', icon: <FitnessCenterIcon className={classes.icons} />, link: '/WorkoutPlan'},
    {key: v4(), text: 'Notifs', icon: <NotificationsIcon className={classes.icons} />, link: '/Notif'},
    {key: v4(), text: 'Subscriptions', icon: <SubscriptionsIcon className={classes.icons} />, link: '/Subscriptions'},
    {key: v4(), text: 'Inbox', icon: <MoveToInboxIcon className={classes.icons} />, link: '/Inbox'},
    {key: v4(), text: 'Support', icon: <HelpIcon className={classes.icons}/>, link: '/Support'},
]
const Sidebar = () => {
    // const { openModals, closeModals,  displayModal} = useContext(UserContext);
    const [displayModal, setDisplayModal] = useState(false)
    
    const openModalHandler = () => {
      setDisplayModal(true)
    }
    
    const closeModalHandler = () => {
      setDisplayModal(false)
    }

    return (
      <>
        <List>
          {options.map((option) => (
            option.text==='Subscriptions' ?
              <ListItem button key={option.key} onClick={openModalHandler}>
                <ListItemIcon>
                  {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItem> :
              <BrowserLink to={option.link}>
                <ListItem button key={option.text}>
                  <ListItemIcon>
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItem>
            </BrowserLink>
          ))}
        </List>
        {displayModal ? <Subscriptions onClose={closeModalHandler} /> : ''}
      </>
    )
}

export default Sidebar;