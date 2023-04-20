import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {addHours} from "date-fns";
import {CalendarEventBox, Navbar} from "../";
import {localizer, getMessagesES} from "../../helpers";

const events = [{
    title: "Erubey's birthday",
    notes: 'Buy a cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Erubey'
    }
}]

export const CalendarPage = () => {

    const eventStyleGetter = () => {
        const style = {
            backgroundColor: '#478a4d',
            borderRadius: '0px',
            opacity: 0.9,
            color: 'white'
        }

        return{
            style
        }
    }

    return(
        <>
            <Navbar/>

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 90px)'}}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEventBox
                }}
            />

        </>
    )
}