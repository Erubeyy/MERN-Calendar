import {useDispatch, useSelector} from "react-redux";
import {clearErrorMessage, onChecking, onLogin, onLogout} from "../store/index.js";
import {calendarApi} from '../api';


export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        console.log({email, password})
        dispatch(onChecking());

        try {
            const resp = await calendarApi.post('/auth', {email, password})
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: resp.data.name, uid: resp.data.uid}));

        }catch (e) {
            dispatch(onLogout(' Wrong Credentials'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async({email, password, name}) => {
        console.log({email, password})
        dispatch(onChecking());

        try {
            const resp = await calendarApi.post('/auth/new', {email, password, name})
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: resp.data.name, uid: resp.data.uid}));

        }catch (e) {
            dispatch(onLogout(e.response.data?.msg || '--'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const resp = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: resp.data.name, uid: resp.data.uid}))
        }catch (e) {
            localStorage.clear()
            dispatch( onLogout())
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return{
        //* Properties
        status,
        user,
        errorMessage,


        //* Methods
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,

    }
}