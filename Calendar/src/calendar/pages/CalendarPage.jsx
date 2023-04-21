import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {CalendarEventBox, CalendarModal, FabAddNew, Navbar} from "../";
import {localizer, getMessagesES} from "../../helpers";
import {useState} from "react";
import {useCalendarStore, useUiStore} from "../../hooks";


export const CalendarPage = () => {

    const { events, setActiveEvent } = useCalendarStore()
    const { openDateModal } = useUiStore()
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
        openDateModal();
    }

    const onSelect = (event) => {
        // console.log({click: event});
        setActiveEvent(event);
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

            <FabAddNew/>

        </>
    )
}