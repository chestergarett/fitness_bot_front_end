//dependencies
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
//css
import classes from './ProfileBody.module.css';
//context
import UserContext from '../../context/user-context.js';
//components
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
//material
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const ProfileBody = (props) => {    

    const initialState = {
        first_name: props.clientProfile.first_name,
        last_name: props.clientProfile.last_name,
        height: props.clientProfile.height,
        current_weight: props.clientProfile.current_weight,
        goal_weight: props.clientProfile.goal_weight,
        sex: props.clientProfile.sex,
        age: props.clientProfile.age,
        workout_frequency: props.clientProfile.workout_frequency,
        body_type: props.clientProfile.body_type,
        target_date: props.clientProfile.target_date,
    }

    const { userHeaders } = useContext(UserContext);

    const [formData, setFormData] = useState(initialState);
    const [enabled, setEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEnable = () => {
        setEnabled(true)
        setSuccess(false)
        setError(false)
    }

    const handleDisable = () => {
        setEnabled(false)
        setSuccess(false)
        setError(false)
    }

    const handleSumbitUpdate = () => {
        setIsLoading(true)
        const credentials = {
            "client_profile[first_name]": formData.first_name,
            "client_profile[last_name]": formData.last_name,
            "client_profile[height]": formData.height,
            "client_profile[current_weight]": formData.current_weight,
            "client_profile[goal_weight]": formData.goal_weight,
            "client_profile[sex]": formData.sex,
            "client_profile[age]": formData.age,
            "client_profile[workout_frequency]": formData.workout_frequency,
            "client_profile[body_type]": formData.body_type,
            "client_profile[target_date]": formData.target_date,
        }
        axios.patch(`https://fitness-bot-avion.herokuapp.com/api/v1/client_profiles/${props.clientProfile.id}`, qs.stringify(credentials), {
            headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
        })
        .then( (res) => { 
            console.log(res)
            setSuccessMessage('Successfully updated profile details.')
            setSuccess(true)
            setError(false)
            setIsLoading(false)
            setEnabled(false)
            })
        .catch( (err) => {
            setErrorMessage(err.response?.data.error)
            setIsLoading(false) 
            setSuccess(false)
            setError(true)
            setEnabled(false)
        })
    }

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <Typography variant="h5" component="div" className={classes.headerText}>Profile</Typography>
                <div>
                    {success ? <div className={classes.success}>{successMessage}</div>: ''}
                    {error ? <div className={classes.error}>Error Updating profile. Please double check inputs</div>: ''}
                    {!enabled ? 
                        <>
                        <Button variant="contained" className={classes.headerButton} onClick={handleEnable}>Update</Button>
                        </> :
                        <>
                        <Button variant="contained" className={classes.headerButton} onClick={handleSumbitUpdate}>{isLoading ? <LoadingSpinner/> : 'Submit'}</Button>
                        <Button variant="contained" className={classes.cancelButton} onClick={handleDisable}>Cancel</Button>
                        </>
                    }
                </div>
            </div>
            <div className={classes.nameDetails}>
                <TextField 
                    variant="outlined" 
                    disabled={enabled ? false : true}
                    defaultValue={formData.first_name} 
                    label="First Name" 
                    className={classes.nameDetailsInputs}
                    onChange={(e)=>setFormData({...formData, first_name: e.target.value})}
                />
                <TextField 
                    variant="outlined" 
                    disabled={enabled ? false : true}
                    defaultValue={formData.last_name} 
                    label="Last Name" 
                    className={classes.nameDetailsInputs}
                    onChange={(e)=>setFormData({...formData, last_name: e.target.value})}
                />
            </div>
            <div className={classes.currentDetails}>
                <div className={classes.currentDetailsHeader}>
                    <Typography variant="body2" component="div" className={classes.subheaderText}>Current Stats</Typography>
                </div>
                <div className={classes.gender}>
                    <RadioGroup 
                        row aria-label="gender" 
                        name="row-radio-buttons-group" 
                        defaultValue={formData.sex}
                        onChange={(e)=>setFormData({...formData, sex: e.target.value})}
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Male" disabled={enabled ? false : true}/>
                        <FormControlLabel value="female" control={<Radio />} label="Female" disabled={enabled ? false : true}/>
                    </RadioGroup>
                </div>
                <div className={classes.currentheightandweight}>
                    <TextField 
                        number
                        variant="outlined" 
                        disabled={enabled ? false : true}
                        defaultValue={parseFloat(formData.age)} 
                        label="Age" 
                        className={classes.nameDetailsInputs} 
                        onChange={(e)=>setFormData({...formData, age: e.target.value})}
                    />
                    <TextField 
                        number
                        variant="outlined" 
                        disabled={enabled ? false : true}
                        defaultValue={parseFloat(formData.current_weight)} 
                        label="Current Weight" 
                        className={classes.nameDetailsInputs}
                        onChange={(e)=>setFormData({...formData, current_weight: e.target.value})}
                    />
                    <TextField 
                        number
                        variant="outlined" 
                        disabled={enabled ? false : true}
                        defaultValue={parseFloat(formData.height)} 
                        label="Current Height" 
                        className={classes.nameDetailsInputs}
                        onChange={(e)=>setFormData({...formData, height: e.target.value})}
                    />
                </div>
                <div className={classes.selectContainer}>
                    <div className={classes.bodyTypeContainer}>
                        <Typography variant="body2" component="div" className={classes.bodyTypeLabel}>Body Type</Typography>
                        <Select 
                            row 
                            disabled={enabled ? false : true}
                            aria-label="Body Type" 
                            defaultValue={formData.body_type} 
                            className={classes.bodyTypeInputs}
                            onChange={(e)=> setFormData({...formData, body_type: e.target.value})}
                            >
                            <MenuItem value={"SKINNY"}>Skinny</MenuItem>
                            <MenuItem value={"SKINNY FAT"}>Skinny Fat</MenuItem>
                            <MenuItem value={"LEAN"}>Lean</MenuItem>
                            <MenuItem value={"LEAN FAT"}>Lean Fat</MenuItem>
                            <MenuItem value={"MUSCULAR"}>Muscular Fat</MenuItem>
                        </Select>
                    </div>
                </div>
                <div className={classes.selectContainer}>
                    <div className={classes.bodyTypeContainer}>
                        <Typography variant="body2" component="div" className={classes.bodyTypeLabel}>Workout Frequency</Typography>
                        <Select 
                            disabled={enabled ? false : true}
                            row 
                            aria-label="Workout Frequency" 
                            className={classes.bodyTypeInputs}
                            defaultValue={formData.workout_frequency} 
                            onChange={(e)=> setFormData({...formData, workout_frequency: e.target.value})}
                        >
                            <MenuItem value={"NEVER"}>Never</MenuItem>
                            <MenuItem value={"SELDOM"}>Seldom</MenuItem>
                            <MenuItem value={"OFTEN"}>Often</MenuItem>
                            <MenuItem value={"ALWAYS"}>Always</MenuItem>
                        </Select>
                    </div>
                </div>
                <div className={classes.targetContainer}>
                    <div className={classes.currentDetailsHeader}>
                        <Typography variant="body2" component="div" className={classes.subheaderText}>Target Stats</Typography>
                    </div>
                    <div className={classes.goalWeightContainer}>
                        <TextField 
                            variant="outlined"
                            disabled={enabled ? false : true}
                            number
                            defaultValue={parseFloat(formData.goal_weight)} 
                            label="Goal Weight" 
                            className={classes.bodyTypeInputs2}
                            onChange={(e)=> setFormData({...formData, goal_weight: e.target.value})}
                        />
                        <div className={classes.bodyTypeInputs2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disabled={enabled ? false : true}
                                    id="target-date"
                                    label="Set Target Date"
                                    defaultValue={formData.target_date}
                                    renderInput={(params) => (<TextField {...params} helperText={params?.inputProps?.placeholder} className={classes.bodyTypeInputs2}/>)}
                                    onChange={(newValue) => {setFormData({...formData, target_date: newValue})}}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBody;