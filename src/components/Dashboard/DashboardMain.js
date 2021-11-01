//components
import Drawer from '../Drawer/Drawer';
import KPIMain from '../KPIs/KPIMain';
//material
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DashboardMain = () => {
    return(
        <Drawer>
            <DrawerHeader/>
            <KPIMain/>
        </Drawer>
    )
}

export default DashboardMain;