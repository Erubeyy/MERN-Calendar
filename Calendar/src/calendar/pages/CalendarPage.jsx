import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {addHours} from "date-fns";
import {CalendarEventBox, CalendarModal, Navbar} from "../";
import {localizer, getMessagesES} from "../../helpers";
import {useState} from "react";

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

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

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

    const onDoubleClick = (event) => {
        console.log({doubleClick: event});
    }

    const onSelect = (event) => {
        console.log({click: event});
    }

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    }

    return(
        <>
            <Navbar/>

            <Calendar
                culture='es'
                localizer={localizer}
                defaultView={lastView}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 90px)'}}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEventBox
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal/>

        </>
    )
}