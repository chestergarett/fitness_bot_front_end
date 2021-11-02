//dependencies
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//context
import UserContext from '../../context/user-context.js';
//components
import LoadingSpinnerDark from '../LoadingSpinner/LoadingSpinnerDark';
import ProfileBody from './ProfileBody';
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
    const { userHeaders, clientProfile, setClientProfile } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect( ()=> {
        setIsLoading(true)
        axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/client_profiles',{
            headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders'))
        })
        .then( (res)=> {
            setIsLoading(false)
            var details = res.data.data[res.data.data.length - 1]
            setClientProfile({...clientProfile, 
                id: details.id,
                first_name: details.first_name,
                last_name: details.last_name,
                height: details.height,
                current_weight: details.current_weight,
                goal_weight: details.goal_weight,
                sex: details.sex,
                age: details.age,
                workout_frequency: details.workout_frequency,
                body_type: details.body_type,
                target_date: details.target_date,})

            console.log(details)
        })
        .catch( (error) => {
            setIsLoading(false)
            console.error(error)
        })
    }, [])

    return(
        <Drawer>
            <DrawerHeader />
            {isLoading ? <LoadingSpinnerDark/> : <ProfileBody clientProfile={clientProfile} />}
        </Drawer>
    )       
}

export default Profile;