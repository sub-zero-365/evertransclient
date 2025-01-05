import axios from 'axios';

let url = 'http://192.168.43.68:5000'; // Default URL, can be overwritten below

if (process.env.NODE_ENV === 'development') {
    // url = 'http://192.168.43.79:5000';
    url = 'http://localhost:5000';
} else if (process.env.NODE_ENV === 'production') {
    url = 'https://api.eagle-tranz.com/';
}

const customFetch = axios.create({ 
    baseURL: url,
    withCredentials: true,  // Ensures cookies are sent with the request

});

export default customFetch;
