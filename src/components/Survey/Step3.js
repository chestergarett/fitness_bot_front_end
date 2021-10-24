//dependencies
import { useState, useContext } from 'react';
//context
import UserContext from '../../context/user-context.js';
//css 
import classes from './Steps.module.css';
//material
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

const TargetDate = ()  => {
  const [value, setValue] = useState(null);

  const { clientProfile, setClientProfile } = useContext(UserContext);
  return (
    
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormHelperText id="target-date-helper" className={classes.targetLabel}>You may or may not set a target date. But we recommend you do.</FormHelperText>
      <DatePicker
        id="target-date"
        label="Set Target Date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setClientProfile({...clientProfile, target_date: newValue})
        }}
        renderInput={(params) => (
          <TextField {...params} helperText={params?.inputProps?.placeholder} />
        )}
      />
    </LocalizationProvider>
  );
}

const Step3 = () => {
  const { clientProfile, setClientProfile } = useContext(UserContext);
    return(
        <div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <FormHelperText id="outlined-target-weight-helper-text">Target Weight</FormHelperText>
                <OutlinedInput
                    id="outlined-target-adornment-weight"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    aria-describedby="outlined-target-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    onChange={(e)=> setClientProfile({...clientProfile, goal_weight: e.target.value})}
                />
            </FormControl>
            <TargetDate />
        </div>
    )
}

export default Step3;