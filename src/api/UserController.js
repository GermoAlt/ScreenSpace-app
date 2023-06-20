import {getInstance as api} from "./ApiHandler";

const prefix = "/users"

export function createOwnerUser(body, token){
    return api(token).post(prefix,body)
}

export function getUser(token) {
    return api(token).get(prefix + '/me')
}

export function deleteUser(token) {
    return api(token).delete(prefix + '/me')
}

export function updateUser(body, token) {
    return api(token).put(prefix + '/me', body)
}

export function confirmRegistration(body, token) {
    return api(token).post(prefix + '/confirm-registration', body)
}

