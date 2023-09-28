import axios from 'axios';
let downloadbaseurl = null
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    // dev code
} else {
    // production code
    downloadbaseurl = process.env.REACT_APP_PROD_URL

}

const customFetch = axios.create({
    // baseURL: 'http://192.168.43.68:5000',
    baseUrl: "https://evertrans.onrender.com",
    // baseURL: "http://localhost:5000",
    withCredentials: true
});

export default customFetch;
