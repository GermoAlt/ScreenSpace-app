import {getInstance as api} from "./ApiHandler";
import { getKey } from "../helper";

const prefix = "/cinemas"

export async function getCinemasByUser(idUser, token){
    return await  api(token).get(prefix)
}

export async function getCinemas(token) {
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