//dependencies
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'

//css 
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)
const allViews = Object.keys(Views).map(k => Views[k])

const Tracker = (props) => {
 
  const events = [
    {id: 1,start: new Date(2021,10,22,9), end: new Date(2021,10,22,11)}
  ]

 return(
  <div>
    <Calendar
      events={events}
      localizer={localizer}
      views={allViews}
      showMultiDayTimes
      defaultDate={new Date(2021, 10, 22)}
      style={{ style, height: 500 }}
    />
  </div>
 )
}

export default Tracker;