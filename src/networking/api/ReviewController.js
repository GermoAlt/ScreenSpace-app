import {getKey} from "../helper";
import {getInstance as api} from "./ApiHandler";

const prefix = "/reviews"

export function postReview(movieId, body){
    return getKey("accessToken").then((token)=>{
        return api(token).post(movieId+prefix, body)
    })
}

export function getReviewsByMovie(movieId){
    return getKey("accessToken").then((token)=>{
        return api(token).get(movieId+prefix)
    })
}
