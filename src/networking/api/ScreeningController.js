import {getInstance as api, buildQueryParams} from "./ApiHandler";
import { getKey } from "../helper";

const prefix = "/screenings"

export async function postScreening(body){
    const token = await getKey('accessToken')
    return await api(token).post(prefix, body)
}

export function getScreenings(criteria) {
    return getKey('accessToken').then(token=>{
        return api(token).get(prefix + '?cinema='+criteria)
    })
    //console.log(buildQueryParams(criteria))
    //return await api(token).get(prefix + buildQueryParams(criteria))
}



export function getScreening(id) {
    return getKey('accessToken').then(token=>{
        return api(token).get(prefix + '/' + id)
    })
}

export function updateScreening(id, screening) {
    return getKey('accessToken').then(token=>{
        return api(token).put(prefix + '/' + id, screening)
    })
}

export function deleteScreening(id) {
    return getKey('accessToken').then(token=>{
        return api(token).delete(prefix + '/' + id)
    })
}

export function getAvailability(criteria) {
    return getKey('accessToken').then(token=>{
        console.log('/availability' + buildQueryParams(criteria))
        return api(token).get(prefix + '/availability' + buildQueryParams(criteria))
    })
}
