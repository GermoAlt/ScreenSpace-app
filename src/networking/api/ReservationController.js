import {getInstance as api} from "./ApiHandler";
import { getKey } from "../helper";

const prefix = "/reservations"

export async function postReservation(body) {
    const token = await getKey('accessToken')
    return await api(token).post(prefix, body)
}
