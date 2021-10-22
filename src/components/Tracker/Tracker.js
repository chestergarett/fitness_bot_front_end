//dependencies
import { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
//context
import UserContext from '../../context/user-context.js';
//css 
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)
const allViews = Object.keys(Views).map(k => Views[k])

const Tracker = (props) => {

  const { userWorkouts,setUserWorkouts, userHeaders } = useContext(UserContext);
  const [events, setEvents] = useState([{}])
  useEffect( ()=> {
    axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/workout_plans/user_workouts', 
    { headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')) })
    .then((res)=> {
        (res.data.data).map(event => {
            const start = moment(event.start,'YYYY-MM-DD HH:mm').toDate();
            const end =  moment(event.end,'YYYY-MM-DD HH:mm').toDate();
            setEvents(events => [...events, {start: start, end: end, title: event.title, id: event.id}])
        }) 
        setUserWorkouts(res.data.data)
    })
    .catch((error) => { 
        console.log(error)
    })
}
,[])

 return(
  <div>
    <Calendar
      events={events}
      localizer={localizer}
      views={['month', 'week', 'day']}
      showMultiDayTimes
      defaultDate={new Date()}
      style={{ style, height: 500 }}
    />
  </div>
 )
}

export default Tracker;