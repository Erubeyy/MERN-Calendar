import {AppRouter} from "./router";
import {BrowserRouter} from "react-router-dom";

export const CalendarApp = () => {
    return(
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}