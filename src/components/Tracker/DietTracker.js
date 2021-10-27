//dependencies
import moment from 'moment';
//calendar
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const DietTracker = () => {
    return(
        <Calendar
            selectable
            localizer={localizer}
            views={['month', 'week', 'day', 'agenda']}
            showMultiDayTimes
            defaultDate={new Date()}
            style={{ style, height: 400, width: 1000 }}
        />
    )
}

export default DietTracker;