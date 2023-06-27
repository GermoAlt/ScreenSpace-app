import {getInstance as api} from "./ApiHandler";
import { getKey } from "../helper";

// cinemas/{cinemaId}/theaters
const prefix = "/cinemas"

export async function getTheatersByCinema(idCinema){
    const token = await getKey('accessToken')
    return await api(token).get(prefix + '/' + idCinema + '/theaters') 
}


export async function postTheaterByCinema(body){
    const token = await getKey('accessToken')
    return await api(token).post(prefix + '/' + body.cinemaId + '/theaters', body) 
}
