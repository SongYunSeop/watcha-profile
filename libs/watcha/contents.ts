import {API_USERS} from './constatns';
import request from "./request";

const movies = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/movies`)

const tv_seasons = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/tv_seasons`)

const books = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/books`)

const movieRating = async (userID: string, page: number): Promise<Response> => await request(`${API_USERS}/${userID}/contents/movies/ratings?page=${page}&size=20`).then(res => res.json())

const tvSeasonRating = async (userID: string, page: number): Promise<Response> => await request(`${API_USERS}/${userID}/contents/tv_seasons/ratings?page=${page}&size=20`).then(res => res.json())

const bookRating = async (userID: string, page: number): Promise<Response> => await request(`${API_USERS}/${userID}/contents/books/ratings?page=${page}&size=20`).then(res => res.json())

const allMovies = async (userID: string) => {
    const maxSize = 20
    return await movies(userID)
        .then(res => res.json())
        .then(json => Math.ceil(json.result.action_count.ratings / maxSize))
        .then(count => {
            return Promise.all(
                Array.apply(null, Array(count)).map((i, page) => movieRating(userID, page + 1))
            )
        })
}

const allTvSeasons = async (userID: string) => {
    const maxSize = 20
    return await movies(userID)
        .then(res => res.json())
        .then(json => Math.ceil(json.result.action_count.ratings / maxSize))
        .then(count => {
            return Promise.all(
                Array.apply(null, Array(count)).map((i, page) => tvSeasonRating(userID, page + 1))
            )
        })
}


const allBooks = async (userID: string) => {
    const maxSize = 20
    return await books(userID)
        .then(res => res.json())
        .then(json => Math.ceil(json.result.action_count.ratings / maxSize))
        .then(count => {
            return Promise.all(
                Array.apply(null, Array(count)).map((i, page) => bookRating(userID, page + 1))
            )
        })
}

export default {movies, tv_seasons, books, allMovies, allTvSeasons, allBooks}
