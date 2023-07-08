import {getInstance as api, buildQueryParams} from "./ApiHandler";
import { getKey } from "../helper";

const prefix = "/screenings"

export async function postScreening(body){
    const token = await getKey('accessToken')
    return await api(token).post(prefix, body)
}

export async function getScreenings(criteria) {
    const token = await getKey('accessToken')
    return await api(token).get(prefix + '?cinema='+criteria)
    //console.log(buildQueryParams(criteria))
    //return await api(token).get(prefix + buildQueryParams(criteria))
}

export async function getScreening(screeningId) {
    const token = await getKey('accessToken')
    return await api(token).get(prefix + '/' + screeningId)
}

function updateScreening(id, screening) {
    return api().put(prefix + '/' + id, screening)
}

function deleteScreening(id) {
    return api().delete(prefix + '/' + id)
}

function getAvailability(criteria) {
    return api().get(prefix + '/availability' + buildQueryParams(criteria))
}
