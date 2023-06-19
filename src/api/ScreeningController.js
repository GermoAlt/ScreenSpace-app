import {getInstance as api, buildQueryParams} from "./ApiHandler";

const prefix = "/screenings"

function postScreening(screening){
    return api().post(prefix, screening)
}

function getScreenings(criteria) {
    return api().get(prefix + buildQueryParams(criteria))
}

function getScreening(id) {
    return api().get(prefix + '/' + id)
}

function updateScreening(id, screening) {
    return api().put(prefix + '/' + id, screening)
}

function deleteScreening(id) {
    return api().delete(prefix + '/' + id)
}

function getAvailability(criteria) {
    return api().get(prefix + '/availability' + api())
}
