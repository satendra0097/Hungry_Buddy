import axios from "axios";
import Swal from "sweetalert2";

const serverURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: serverURL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('Token');
        if (token) config.headers.Authorization = token;
    }
    return config;
});

const getCache = new Map();

function handleError(e) {
    if (e.response) {
        if (e.response.status === 401) Swal.fire('Your session is expired. Please login');
        else if (e.response.status === 404) Swal.fire(e.response.data?.message || 'Resource not found');
        else Swal.fire(e.response.data?.message || 'Site is not working properly. Please wait for sometime');
    } else if (e.request) {
        Swal.fire('Network error. Please check your internet connection.');
    } else {
        Swal.fire('Error: ' + e.message);
    }
    return { status: false, message: e.response?.data?.message || 'Request failed', data: null };
}

function getDate() {
    const cd = new Date();
    return `${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`;
}

function getTime() {
    const cd = new Date();
    return `${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`;
}

async function postData(url, body) {
    try {
        const response = await api.post(`/${url}`, body);
        return response.data;
    } catch (e) {
        return handleError(e);
    }
}

async function getData(url, { ttl = 60000 } = {}) {
    try {
        const cacheKey = `${serverURL}/${url}`;
        if (getCache.has(cacheKey)) {
            const { data, expiresAt } = getCache.get(cacheKey);
            if (Date.now() < expiresAt) return data;
            getCache.delete(cacheKey);
        }
        const response = await api.get(`/${url}`);
        if (response.data?.status) {
            getCache.set(cacheKey, { data: response.data, expiresAt: Date.now() + ttl });
        }
        return response.data;
    } catch (e) {
        return handleError(e);
    }
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export { postData, serverURL, getDate, getTime, getData, generateOTP };
