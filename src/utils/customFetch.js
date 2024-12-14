import axios from 'axios';
var url = 'http://192.168.43.68:5000'
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // url = 'http://192.168.60.68:5000'
    url = 'http://localhost:5000'
} else {
    url = "https://evertrans.onrender.com"
}
const customFetch = axios.create({
    baseURL: url,

    withCredentials: true
});

export default customFetch;
