import {getInstance as api} from "./ApiHandler";
import { getKey } from "../helper";

// cinemas/{cinemaId}/theaters
const prefix = "/cinemas"

export async function getTheatersByCinema(idCinema){
    const token = await getKey('accessToken')
    return await api(token).get(prefix + '/' + idCinema + '/theaters') 
}
