import axios from "axios";
const BASE_URL = 'https://screenspace-back.herokuapp.com/v1';

export function getInstance (token) {
    const authToken = token ? 'Bearer ' + token : ''
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            //'Access-Control-Allow-Origin': '',
            'Content-Type':'application/json',
            'Authorization': authToken 
        },
    })
}

export function buildQueryParams(criteria) {
    return '?' + criteria.map((item) => item)
}
