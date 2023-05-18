import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {CalendarEventBox, CalendarModal, FabAddNew, FabDelete, Navbar} from "../";
import {localizer, getMessagesES} from "../../helpers";
import {useEffect, useState} from "react";
import {useAuthStore, useCalendarStore, useUiStore} from "../../hooks";


export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { openDateModal } = useUiStore()
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event) => {

        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

        const style = {
            backgroundColor: isMyEvent ? '#478a4d' : '#465660',
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

    useEffect(() => {
        startLoadingEvents()
    }, []);


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
            <FabDelete/>

        </>
    )
}