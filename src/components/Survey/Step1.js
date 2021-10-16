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
    return(
        <div className={classes.step1}>
            {/* Sex */}
            <FormControl>
                <FormLabel component="legend">Sex</FormLabel>
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel value="female" control={<Radio />} label="Male" />
                    <FormControlLabel value="male" control={<Radio />} label="Female" />
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
                />
                <FormHelperText id="outlined-weight-helper-text">Age</FormHelperText>
            </FormControl>
        </div>
    )
}

export default Step1;