//dependencies
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
//calendar
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
//context
import UserContext from '../../context/user-context.js';
//components
import EditFood from '../DietPlan/EditFood';

const localizer = momentLocalizer(moment)

const DietTracker = ({dietPlan}) => {
    const { userSelectedDietPlan, refresh, userHeaders } = useContext(UserContext);
    const [events, setEvents] = useState([{}])
    const [event, setEvent] = useState({})
    const [open, setOpen] = useState(false)


    const openModalHandler = (event) => {
        setOpen(true)
        setEvent(event)
    }

    const closeModalHandler = () => {
        setOpen(false)
    }

    const styleEvents = (event) => {
        let backgroundColor ='#29b6f6'
        if (event.status=='NOT STARTED'){
          backgroundColor = '#29b6f6'
        }else if(event.status=='ONGOING'){
          backgroundColor = '#ffb74d'
        }else if(event.status=='COMPLETED'){
          backgroundColor = '#66bb6a'
        }else{
          backgroundColor = '#29b6f6'
      }

      let style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return{
            style: style
        };
    }

    //to get all user workouts
    useEffect( ()=> {
        const credentials = {
            diet_plan_id: dietPlan,
        }
        let array = [];
        let credential = {start: '', end: '', title: '', id: '', ingredientLines: '', totalWeight: '', mealType: '', dishType: '', calories: '', media: '', status: ''}

        axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/foods', 
        { headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')),
         params:  credentials, 
        })
            .then((res)=> {
                (res.data.data).map(event => {
                    const start = moment(event.start,'YYYY-MM-DD HH:mm').toDate();
                    const end =  moment(event.end,'YYYY-MM-DD HH:mm').toDate();
                    credential = {start: start, 
                        end: end, 
                        id: event.id,
                        title: event.title, 
                        ingredientLines: event.ingredientLines,
                        totalWeight: event.totalWeight,
                        mealType: event.mealType,
                        dishType: event.dishType,
                        calories: event.calories,
                        media: event.media,
                        status: event.status,
                        food_type: event.food_type}
                    array.push(credential)
                    console.log(credential)
                }) 
                setEvents(array)
                console.log(dietPlan)
            })
            .catch((error) => { 
                console.log(error.response)
                console.log(dietPlan)
            })
        }
    ,[refresh,userSelectedDietPlan])

    

    return(
        <>
        <Calendar
            events={events}
            selectable
            localizer={localizer}
            views={['month', 'week', 'day', 'agenda']}
            showMultiDayTimes
            defaultDate={new Date()}
            style={{ style, height: 400, width: 1000 }}
            onSelectEvent={event => openModalHandler(event)}
            eventPropGetter={event => styleEvents(event)}
        />
        {open ? <EditFood onClose={closeModalHandler} event={event}/> : ''}
        </>
    )
}

export default DietTracker;