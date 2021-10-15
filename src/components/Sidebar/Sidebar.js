import classes from './Sidebar.module.css';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import HelpIcon from '@mui/icons-material/Help';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const options = [
    {text: 'Home', icon: <HomeIcon className={classes.icons} />},
    {text: 'Profile', icon: <AssignmentIndIcon className={classes.icons} />},
    {text: 'Diet Plan', icon: <FastfoodIcon className={classes.icons} />},
    {text: 'Workout Plan', icon: <FitnessCenterIcon className={classes.icons} />},
    {text: 'Notifs', icon: <NotificationsIcon className={classes.icons} />},
    {text: 'Inbox', icon: <MoveToInboxIcon className={classes.icons} />},
    {text: 'Support', icon: <HelpIcon className={classes.icons}/>},
]
const Sidebar = () => {
    return (
        <List>
          {options.map((option) => (
            <ListItem button key={option.text}>
              <ListItemIcon>
                {option.icon}
              </ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}
        </List>
    )
}

export default Sidebar;