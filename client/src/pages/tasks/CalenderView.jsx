import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Localizer for calendar
const localizer = momentLocalizer(moment);

const CalendarView = () => {
     // State for tasks and diary notes

     return (
          <>
               {/* Calendar Component */}
               <Calendar
                    localizer={localizer}
                    startAccessor="date"
                    endAccessor="date"
                    selectable
                    className='h-[80vh] md:w-9/12 mx-auto'
               />
          </>
     );
};

export default CalendarView;