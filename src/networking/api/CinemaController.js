import {getInstance as api} from "./ApiHandler";

const prefix = "/cinemas"

export function getCinemasByUser(idUser, token){
    return api(token).get(prefix)
}

export function getCinemas(token) {
    return api(token).get(prefix)
}
