import {getInstance as api} from './ApiHandler';
import { getKey } from "../helper";

const prefix = '/auths';

export function loginOwnerUser(body) {
    try {
        return {status, data } = api().post(prefix, body);
    } catch (error) {
        return { status, data, error } = error.response
    }
    
}

export function refreshAccessToken(body, token) {
  return api(token).put(prefix, body);
}

export async function logoutOwnerUser() {
  const token = await getKey('accessToken')
  return api(token).delete(prefix);
}

export async function forgotPassword(body) {
  return await api().post('/forgot-password', body);
}

export async function resetPassword(body) {
  return await api().post('/reset-password', body);
}

export function confirmResetPassword(body) {
  return api().post('/reset-password/confirm', body);
}