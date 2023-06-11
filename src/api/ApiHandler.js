import axios from "axios";

export function getInstance (token) {
    return axios.create({
        baseURL: 'https://screenspace-back.herokuapp.com/api/v1',
        headers:{
            //'Access-Control-Allow-Origin': '',
            'Content-Type':'application/json',
            'token': token || ""
        }
    })
}
