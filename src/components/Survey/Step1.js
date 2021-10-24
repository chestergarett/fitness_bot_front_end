
//dependencies
import { useState, useContext } from 'react';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './Steps.module.css'
//material
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const Step1 = () => {

    const { clientProfile,setClientProfile } = useContext(UserContext);

    return(
        <div className={classes.step1}>
            {/* Sex */}
            <FormControl>
                <FormLabel component="legend">Sex</FormLabel>
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={ (e)=> setClientProfile({...clientProfile, sex: e.target.value})}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>
            {/* Height */}
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-height"
                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                    aria-describedby="outlined-height-helper-text"
                    inputProps={{
                    'aria-label': 'height',
                    }}
                    onChange={ (e)=> setClientProfile({...clientProfile, height: e.target.value})}
                />
                <FormHelperText id="outlined-height-helper-text">Height</FormHelperText>
            </FormControl>
            {/* Weight */}
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    onChange={ (e)=> setClientProfile({...clientProfile, current_weight: e.target.value})}
                />
                <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
            </FormControl>
            {/* Age */}
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-age"
                    endAdornment={<InputAdornment position="end">yrs old</InputAdornment>}
                    aria-describedby="outlined-age-helper-text"
                    inputProps={{
                    'aria-label': 'age',
                    }}
                    onChange={ (e)=> setClientProfile({...clientProfile, age: e.target.value})}
                />
                <FormHelperText id="outlined-weight-helper-text">Age</FormHelperText>
            </FormControl>
        </div>
    )
}

export default Step1;