import {getInstance as api} from "./ApiHandler";
import { getKey } from "../helper";

const prefix = "/users"

export async function createOwnerUser(body){
    return await api().post(prefix,body)
}

export async function getUser() {
    const token = await getKey('accessToken')
    try {
        const { status, data } = await api(token).get(prefix + '/me')
        return { status, data }
    } catch (error) {
        return { status, data, error } = error.response
    }
}

export async function deleteUser() {
    const token = await getKey('accessToken')
    return api(token).delete(prefix + '/me')
}

export async function updateUser(body) {
    const token = await getKey('accessToken')
    return api(token).put(prefix + '/me', body)
}

export async function confirmRegistration(body) {
    return await api().post(prefix + '/confirm-registration', body)
}

