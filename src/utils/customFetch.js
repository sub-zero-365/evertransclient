import axios from 'axios';
var url = 'http://192.168.43.68:5000'
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // url = 'http://localhost:5000'
    url = 'http://192.168.43.79:5000'
} else {
    url = "https://api.eagle-tranz.com/"
}
const customFetch = axios.create({
    baseURL: url,

    withCredentials: true
});

export default customFetch;
