import axios from "axios";
import Swal from "sweetalert2";

const serverURL = process.env.NEXT_PUBLIC_API_URL;


function getDate() {
    var cd = new Date()
    return (`${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`)
}

function getTime() {
    var cd = new Date()
    return (`${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`)
}

async function postData(url, body) {
    try {
        console.log(" POST Request:");
        console.log(" URL:", `${serverURL}/${url}`);
        console.log(" Body:", body);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Token') || '',
            }
        };
        
        const response = await axios.post(`${serverURL}/${url}`, body, config);
        console.log("Response Status:", response.status);
        console.log(" Response Data:", response.data);
        
        return response.data;
    } 
    catch (e) {
        console.log(" POST Error:", e);
        console.log(" Error Message:", e.message);
        console.log(" Error Response:", e.response ? e.response.data : 'No response');
        console.log("Error Status:", e.response ? e.response.status : 'No status');
        
        //  Safe error handling
        if (e.response) {
            // Server responded with an error status
            if (e.response.status === 401) {
                Swal.fire('Your session is expired. Please login');
            } else if (e.response.status === 404) {
                Swal.fire(e.response.data?.message || 'Resource not found');
            } else {
                Swal.fire(e.response.data?.message || 'Site is not working properly. Please wait for sometime');
            }
        } else if (e.request) {
            // Request was made but no response received
            Swal.fire('Network error. Please check your internet connection.');
        } else {
            // Something else happened
            Swal.fire('Error: ' + e.message);
        }
        
        return { 
            status: false, 
            message: e.response?.data?.message || 'Request failed',
            data: null 
        };
    }
}

async function getData(url) {
    try {
        console.log("🚀 GET Request:");
        console.log("📌 URL:", `${serverURL}/${url}`);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Token') || '',
            }
        };
        
        const response = await axios.get(`${serverURL}/${url}`, config);
        console.log(" Response Status:", response.status);
        console.log(" Response Data:", response.data);
        
        return response.data;
    } 
    catch (e) {
        console.log(" GET Error:", e);
        console.log(" Error Message:", e.message);
        
        //  Safe error handling
        if (e.response) {
            if (e.response.status === 401) {
                Swal.fire('Your session is expired. Please login');
            } else {
                Swal.fire(e.response.data?.message || 'Site is not working properly. Please wait for sometime');
            }
        } else if (e.request) {
            Swal.fire('Network error. Please check your internet connection.');
        } else {
            Swal.fire('Error: ' + e.message);
        }
        
        return { 
            status: false, 
            message: e.response?.data?.message || 'Request failed',
            data: null 
        };
    }
}


function generateOTP() {
    // 6-digit OTP generate karega
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export { postData, serverURL, getDate, getTime, getData, generateOTP };