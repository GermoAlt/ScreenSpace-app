import {getInstance as api} from './ApiHandler';
import {getKey} from "../helper";

const prefix = "/movies"
export const getMovies = async () => {
    const token = await getKey('accessToken')
    return await api(token).get(prefix)
}

export const getMovieById = async (id) => {
    const token = await getKey('accessToken')
    return await api(token).get(prefix + "/" + id)
}
