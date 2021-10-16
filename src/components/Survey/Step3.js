//dependencies
import { useState } from 'react';
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormHelperText id="target-date-helper" className={classes.targetLabel}>You may or may not set a target date. But we recommend you do.</FormHelperText>
      <DatePicker
        id="target-date"
        label="Set Target Date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} helperText={params?.inputProps?.placeholder} />
        )}
      />
    </LocalizationProvider>
  );
}

const Step3 = () => {
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
                />
            </FormControl>
            <TargetDate />
        </div>
    )
}

export default Step3;