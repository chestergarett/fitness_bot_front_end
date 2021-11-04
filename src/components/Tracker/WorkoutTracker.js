//dependencies
import { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
//context
import UserContext from '../../context/user-context.js';
//css 
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
//components
import EditWorkout from '../WorkoutPlan/EditWorkout';

const localizer = momentLocalizer(moment)
const allViews = Object.keys(Views).map(k => Views[k])

const WorkoutTracker = (props) => {

  const { setUserWorkouts, userHeaders, refresh } = useContext(UserContext);
  const [events, setEvents] = useState([{}])
  const [event, setEvent] = useState({})
  const [open, setOpen] = useState(false)
  
  //to get all user workouts
  useEffect( ()=> {
    let array = [];
    let credential = {start: '', end: '', title: '', id: '', reps: '', target: '', status: '', equipment: '', gifUrl: '', bodyPart: '', sets: '', type: ''}
    axios.get('https://fitness-bot-avion.herokuapp.com/api/v1/workout_plans/user_workouts', 
    { headers: window.localStorage.getItem('userHeaders')===null ? userHeaders : JSON.parse(window.localStorage.getItem('userHeaders')) })
    .then((res)=> {
        (res.data.data).map(event => {
            const start = moment(event.start,'YYYY-MM-DD HH:mm').toDate();
            const end =  moment(event.end,'YYYY-MM-DD HH:mm').toDate();
            credential = {start: start, 
              end: end, 
              title: event.title, 
              id: event.id, 
              reps:event.reps, 
              target: event.target, 
              status: event.status, 
              equipment: event.equipment, 
              gifUrl: event.gifUrl, 
              bodyPart:  event.bodyPart, 
              sets: event.sets, 
              type: event.type }
            array.push(credential)
        })
        setEvents(array)
        setUserWorkouts(res.data.data)
    })
    .catch((error) => { 
        console.log(error)
    })
}
,[refresh])

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

 return(
  <div>
    <Calendar
      selectable
      events={events}
      localizer={localizer}
      views={['month', 'week', 'day', 'agenda']}
      showMultiDayTimes
      defaultDate={new Date()}
      style={{ style, height: 500 }}
      onSelectEvent={event => openModalHandler(event)}
      eventPropGetter={event => styleEvents(event)}
    />
    {open ? <EditWorkout onClose={closeModalHandler} event={event}/> : ''}
  </div>
 )
}

export default WorkoutTracker;