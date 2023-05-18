import {useDispatch, useSelector} from "react-redux";
import {onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent} from "../store";
import {calendarApi} from "../api/index.js";
import {convertEventsToDateEvents} from "../helpers/index.js";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {
        events,
        activeEvent
    } = useSelector(state => state.calendar);
    const {
        user
    } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        
        try {
            if(calendarEvent.id){
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return
            }

            const {data} = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
        }catch (e) {
            console.log(e);
            Swal.fire('Error at saving', e.response.data.msg, 'error');
        }
    }

    const startDeletingEvent = async() => {
        
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent());
        }catch (e) {
            console.log(e);
            Swal.fire('Error at deleting', e.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events)
            dispatch(onLoadEvents(events))
        }catch (e) {
            console.log('Loading error', e)
        }
    }

    return{
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Methods
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
        startDeletingEvent,
    }
}