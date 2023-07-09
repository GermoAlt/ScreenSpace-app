import { getAllGenres, getMovies } from "../networking/api/MovieController"

export const getGenresData = async () => {
    try {
        const response = await getAllGenres()
        return response.data.genres.map((item, index) => { return { id: index, title: item } })

    } catch (error) {
        console.log('error', JSON.stringify(error))
        switch (error.response.data.status) {
            case 400:
            case 401:
                setErrMsg(t('translation:login.errors.login.wrongCredentials')); // Bad Request
                break;
            case 500:
                setErrMsg(t('translation:general.errors.default')); // Internal Server Error
                break;
            default:
                setErrMsg(t('translation:general.errors.default'));
                break;
        }
    }
}
//getRatings, getDistances SON MOCKS

export const getMoviesData = async () => {
    try {
        const response = await getMovies()
        //console.log('response', JSON.stringify(response))
        return response.data.movies.map((item) => { return { id: item.id, title: item.title } })

    } catch (error) {
        console.log('error', JSON.stringify(error))
        switch (error.response.data.status) {
            case 400:
            case 401:
                setErrMsg(t('translation:login.errors.login.wrongCredentials')); // Bad Request
                break;
            case 500:
                setErrMsg(t('translation:general.errors.default')); // Internal Server Error
                break;
            default:
                setErrMsg(t('translation:general.errors.default'));
                break;
        }
    }
}