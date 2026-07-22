import axios from "axios";
import Swal from "sweetalert2";

const serverURL = process.env.NEXT_PUBLIC_API_URL;

function getDate() {
    var cd = new Date();
    return `${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`;
}

function getTime() {
    var cd = new Date();
    return `${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`;
}

// ✅ SIRF YEH FUNCTION ADD KIYA HAI (BAS 5 LINES)
function generateOTP() {
    // 6-digit OTP generate karega
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function postData(url, body) {
    try {
        var response = await axios.post(`${serverURL}/${url}`, body);
        var data = response.data;
        return data;
    } catch (e) {
        if (e.response && e.response.status == 401) {
            Swal.fire('Your session is expired...pls login');
        } else {
            Swal.fire('Site is not Working Properly..pls wait for sometime');
        }
        return [];
    }
}

async function getData(url) {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Token')
            }
        };
        var response = await axios.get(`${serverURL}/${url}`, config);
        var data = response.data;
        return data;
    } catch (e) {
        if (e.response && e.response.status == 401) {
            Swal.fire('Your session is expired...pls login');
        } else {
            Swal.fire('Site is not Working Properly..pls wait for sometime');
        }
        return [];
    }
}

// ✅ EXPORT MEIN SIRF generateOTP ADD KIYA HAI
export { postData, serverURL, getDate, getTime, getData, generateOTP };