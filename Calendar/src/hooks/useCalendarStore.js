import {useDispatch, useSelector} from "react-redux";
import {onSetActiveEvent} from "../store/index.js";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {
        events,
        activeEvent
    } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    return{
        // Properties
        events,
        activeEvent,

        //Methods
        setActiveEvent,
    }
}