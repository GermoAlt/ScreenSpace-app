import {getInstance as api} from "./ApiHandler";
import { getKey } from "../helper";

const prefix = "/cinemas"

export async function getCinemasByID(idCinema){
    const token = await getKey('accessToken')
    return await api(token).get(prefix + '/' + idCinema)
}

export async function getCinemas() {
    const token = await getKey('accessToken')
    if(!token) return
    return await api(token).get(prefix)
}

export async function postCinemas(body) {
    const token = await getKey('accessToken')
    return await api(token).post(prefix, body)

    /*
{
    "name": "string",
    "address": {
      "street": "string",
      "number": "string",
      "neighborhood": "string",
      "city": "string",
      "province": "string",
      "country": "string"
    },
    "geoLocation": {
      "latitude": 0,
      "longitude": 0
    },
    "pricePerFunction": 0
  }
  */
}

export async function getScreeningsByCinema(idCinema){
    const token = await getKey('accessToken')
    return await api(token).get(prefix + '/' + idCinema + "/screenings")
}
