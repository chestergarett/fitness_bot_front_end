//dependencies

//context

//css
import classes from './Steps.module.css'
//material
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

const Step2 = () => {
    return(
        <div>
            {/* workout frequency */}
            <FormControl>
                <FormLabel component="legend">How active are you?</FormLabel>
                <RadioGroup row aria-label="active" name="row-radio-buttons-group" className={classes.radioGroup}>
                    <FormControlLabel value="Never works out" control={<Radio />} label={<Typography className={classes.longText}>Never works out</Typography>}/>
                    <FormControlLabel value="Seldom works out" control={<Radio />} label={<Typography className={classes.longText}>Seldom works out</Typography>} />
                    <FormControlLabel value="Works out 2 to 3 times a week" control={<Radio />} label={<Typography className={classes.longText}>Works out 2 to 3 times a week</Typography>} />
                    <FormControlLabel value="Works out daily" control={<Radio />} label={<Typography className={classes.longText}>Works out daily</Typography>} />
                </RadioGroup>
            </FormControl>
            {/* daily problem */}
            <FormControl>
                <FormLabel component="legend">Which describes you?</FormLabel>
                <RadioGroup row aria-label="description" name="row-radio-buttons-group" className={classes.radioGroup}>
                    <FormControlLabel value="I can't get bigger or gain muscle, no matter how much I eat or lift." control={<Radio />} label={<Typography className={classes.longText2}>I can't get bigger or gain muscle, no matter how much I eat or lift.</Typography>} />
                    <FormControlLabel value="I'm skinny fat. I look slim in clothes, but I do have body fat." control={<Radio />} label={<Typography className={classes.longText2}>I'm skinny fat. I look slim in clothes, but I do have body fat.</Typography>} />
                    <FormControlLabel value="I'm happy with my body. But need to lose one layer of fat." control={<Radio />} label={<Typography className={classes.longText2}>I'm happy with my body. But need to lose one layer of fat.</Typography>} />
                    <FormControlLabel value="I'm not happy with my body & want to lose a serious amount of weight." control={<Radio />} label={<Typography className={classes.longText2}>I'm not happy with my body & want to lose a serious amount of weight.</Typography>} />
                </RadioGroup> 
            </FormControl>
        </div>
    )
}

export default Step2;