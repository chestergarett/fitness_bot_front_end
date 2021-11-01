//css
import classes from './DashboardMain.module.css';
//components
import Drawer from '../Drawer/Drawer';
import KPIMain from '../KPIs/KPIMain';
import DashboardColumn from './DashboardColumn';
import DashboardPie from './DashboardPie';
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
            <DrawerHeader/>
            <div className={classes.charts}>
                <div style={{marginRight: '1rem'}}>
                    <DashboardColumn/>
                </div>
                <div>
                <DashboardPie />
                </div>
            </div>
            <DrawerHeader/>
        </Drawer>
    )
}

export default DashboardMain;