import {getInstance as api, buildQueryParams} from './ApiHandler';
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

export const getMoviesFiltered = async (criteria) => {
    const queryParams = buildQueryParams(criteria)
    const token = await getKey('accessToken')
    return await api(token).get(prefix + '/searchMovies' + queryParams)
}

export const getAllGenres = async () => {
    const token = await getKey('accessToken')
    return await api(token).get(prefix + '/genres' )
}
