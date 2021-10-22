//dependencies
import { useState, useContext } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
//components
import Pagination from '../Pagination/Pagination';
import AddWorkout from './AddWorkout';
import LoadingSpinnerDark from '../LoadingSpinner/LoadingSpinnerDark';
//context
import UserContext from '../../context/user-context.js';
//css
import classes from './SearchWorkout.module.css';
//material
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const initialState = {
    name: '',
}

const SearchResults = ({results}) => {
    const [openForm, setOpenForm] = useState(false)

    const openFormHandler = () => {
        setOpenForm(true)
    }

    const closeFormHandler = () => {
        setOpenForm(false)
    }

    return(
        <Box className={classes.resultsBox}>
            {results.map(r => { 
                  
                return(
                <>
                {openForm ? <AddWorkout onClose={closeFormHandler} key={v4()} result={r}/> : '' }
                <Card key={r.id} className={classes.card} onClick={openFormHandler}>
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
                </Card>
                </>
                )
            })}
        </Box>
    )
}

const SearchWorkout = () => {

    const {userHeaders} = useContext(UserContext)
    const [formData, setFormData] = useState(initialState)
    const [results, setResults] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(false)

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(5);

    //fetch data
    const searchHandler = () => {
        setIsLoading(true)
        axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/workouts/get_by_name', 
        { headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')), 
            params: formData 
        })
        .then((res)=> { 
            setResults(res.data.data)
            setIsLoading(false)
        })
        .catch((error) => { 
            setIsLoading(false) 
            setError(true)
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
            {isLoading ? <LoadingSpinnerDark/> : (results.length==0 ? <div className={classes.nosearch}>No search results.</div> : <SearchResults results={currentResults}/>)}
            <Pagination
                resultsPerPage={resultsPerPage}
                totalResults={results.length}
                paginate={paginate}
            />
        </Paper>
    )
}

export default SearchWorkout;