// app/storage/api.js

import axios from "axios";
import Swal from "sweetalert2";

const serverURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================
// GET Request
// ============================================
async function getData(url) {
    try {
        console.log(" GET Request:");
        console.log(" Full URL:", `${serverURL}/${url}`);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Token') || '',
            }
        };
        
        const response = await axios.get(`${serverURL}/${url}`, config);
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
        
        return response.data;
    } 
    catch (e) {
        console.log(" GET Error:", e);
        
        if (e.response) {
            if (e.response.status === 401) {
                Swal.fire('Your session is expired. Please login');
            } else if (e.response.status === 404) {
                Swal.fire(`API not found: ${serverURL}/${url}`);
            } else {
                Swal.fire(e.response.data?.message || 'Site is not working properly.');
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

// ============================================
// POST Request - ✅ For Update
// ============================================
async function postData(url, body) {
    try {
        console.log(" POST Request:");
        console.log(" Full URL:", `${serverURL}/${url}`);
        console.log(" Body:", body);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Token') || '',
            }
        };
        
        const response = await axios.post(`${serverURL}/${url}`, body, config);
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
        
        return response.data;
    } 
    catch (e) {
        console.log(" POST Error:", e);
        
        if (e.response) {
            if (e.response.status === 401) {
                Swal.fire('Your session is expired. Please login');
            } else {
                Swal.fire(e.response.data?.message || 'Failed to update');
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

export { getData, postData };  // ✅ Dono export ho rahe hain