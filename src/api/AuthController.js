import {getInstance as api} from "./ApiHandler";

const prefix = "/auths"

export function loginOwnerUser(body, token){
    return api(token).post(prefix,body)
}

export function refreshAccessToken(body, token) {
    return api(token).put(prefix, body)
}

export function logoutOwnerUser(token) {
    return api(token).delete(prefix)
}

export function forgotPassword(body, token) { //Necesitammos TOKEN para esto??
    return api(token).post('/forgot-password', body)
}

export function resetPassword(body, token) { //Necesitammos TOKEN para esto??
    return api(token).post('reset-password', body)
}

export function confirmResetPassword(body, token) { //Necesitammos TOKEN para esto??
    return api(token).post('/reset-password/confirm', body)
}

