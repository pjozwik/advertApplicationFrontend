import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8222/'


export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token")
}

export const setAuthToken = (token) => {
    window.localStorage.setItem("auth_token", token)
}

export const getRole = () => {
    return window.localStorage.getItem("role")
}

export const setRole = (role) => {
    window.localStorage.setItem("role", role)
}

export default axios.create({
    baseURL: 'http://localhost:8222/',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export const request = (url, data, method) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== 'undefined') {
        headers = {
            "Authorization": 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*'
        };
    } else {
        headers = {
            'Access-Control-Allow-Origin': '*'
        };
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    })
}
