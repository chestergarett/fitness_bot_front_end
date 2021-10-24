//components
import KPIMain from '../KPIs/KPIMain';
import WorkoutTracker from '../Tracker/WorkoutTracker';
import Drawer from '../Drawer/Drawer';
//material
import { styled, useTheme } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Profile = () => {
    return(
        <Drawer>
            <DrawerHeader />
            <KPIMain />
            <DrawerHeader />
            <WorkoutTracker />
        </Drawer>
    )       
}

export default Profile;