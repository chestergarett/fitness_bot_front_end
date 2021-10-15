//dependencies
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

//css 
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const Tracker = props => (
  <div>
    <Calendar
      localizer={localizer}
      //events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ style, height: 500 }}
    />
  </div>
)

export default Tracker;