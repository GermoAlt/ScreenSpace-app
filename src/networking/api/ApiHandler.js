import axios from "axios";

const BASE_URL = 'https://screenspace-back.herokuapp.com/v1';

export function getInstance(token) {
    const authToken = token ? 'Bearer ' + token : ''
    axios.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
    })
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            //'Access-Control-Allow-Origin': '',
            'Content-Type': 'application/json',
            'Authorization': authToken
        },
    })
}

export function buildQueryParams(criteria) {
    let qp = ""

    if(Object.entries(criteria).length !== 0) {
        qp += '?'
        for (const entry of Object.entries(criteria)) {
            qp += entry[0] + "=" + entry[1] + "&"
        }
        qp = qp.slice(0, qp.length-1)
    }

    return qp
}
