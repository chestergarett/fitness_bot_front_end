//dependencies
import { useState, useContext } from 'react';
import axios from 'axios';
//components
import Pagination from '../Pagination/Pagination';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './SearchWorkout.module.css';
//material
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const initialState = {
    name: '',
}

const SearchResults = ({results}) => {
    return(
        <Box className={classes.resultsBox}>
            {results.map(r => { 
                return(
                <Card key={r.id} className={classes.card}>
                    <Typography className={classes.header} component="div">
                        {r.name}
                    </Typography>
                    <CardMedia
                    component="img"
                    alt={r.name}
                    height="100"
                    image={r.gifUrl}
                    className={classes.image}
                    />
                    <CardContent>
                    <div className={classes.cardContent}>
                        <span className={classes.key}>Equipment &nbsp;</span>
                        <span className={classes.value}>{r.equipment} </span>
                    </div>
                    <div className={classes.cardContent}>
                        <span className={classes.key}>Target &nbsp;</span>
                        <span className={classes.value}>{r.target} </span>
                    </div>
                    <div className={classes.cardContent}>
                        <span className={classes.key}>Body Part &nbsp;</span>
                        <span className={classes.value}>{r.bodyPart} </span>
                    </div>
                    </CardContent>
                    {/* <CardActions className={classes.cardActions}>
                        <IconButton color="success">
                            <AddCircleIcon className={classes.icon}/>
                        </IconButton>
                    </CardActions> */}
                </Card>)
            })}
        </Box>
    )
}

const SearchWorkout = () => {

    const {userHeaders} = useContext(UserContext)
    const [formData, setFormData] = useState(initialState)
    const [results, setResults] = useState([])

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(5);

    //fetch data
    const searchHandler = () => {
        axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/workouts/get_by_name', 
        { headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')), 
            params: formData 
        })
        .then((res)=> { 
            console.log(res.data.data) 
            setResults(res.data.data)
        })
        .catch((error) => { 
            console.log(error.response) 
        })
    }

    // Get current posts
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Paper elevation={0} className={classes.paper}>
            <Box className={classes.searchbar}>
                <TextField 
                    id="search_workout" 
                    label="Search workout here" 
                    variant="outlined" 
                    onChange={ (e) => setFormData({...formData, name: e.target.value}) }
                />
                <Button variant="contained" className={classes.button} onClick={searchHandler}>Search</Button>
            </Box>
            <SearchResults results={currentResults}/>
            <Pagination
                resultsPerPage={resultsPerPage}
                totalResults={results.length}
                paginate={paginate}
            />
        </Paper>
    )
}

export default SearchWorkout;