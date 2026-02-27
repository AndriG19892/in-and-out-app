import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//creo un istanza personalizzata
const api = axios.create ( {
    baseURL: baseURL,
} );

console.log("url backend",baseURL);

//Aggiungiamo un INTERCEPTOR
api.interceptors.request.use ( config => {
        const token = localStorage.getItem ( 'token' );
        if ( token ) {
            //se il token c'è lo aggiungiamo all'header Authorization
            config.headers.Authorization = `Bearer ${ token }`;
        }
        return config;
    },
    ( error ) => {
        return Promise.reject ( error )
    }
);

//Interceptor per le risposte:
api.interceptors.response.use (
    ( response ) => response,
    ( error ) => {
        if ( error.response && error.response.status === 401 ) {
            //se il server risponde 401, il token è scaduto o invalido
            localStorage.clear ();
            window.location.href = '/login';
        }
        return Promise.reject ( error );
    }
);

export default api;
