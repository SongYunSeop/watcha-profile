import {API_USERS, API_CONTENTS} from './constatns';
import request from "./request";

const contents = async (code: string): Promise<Response> => await request(`${API_CONTENTS}/${code}`)

contents.movies = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/movies`)

contents.tvSeasons = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/tv_seasons`)

contents.books = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/books`)

contents.movieRating = async (userID: string, page: number): Promise<Response> => await request(`${API_USERS}/${userID}/contents/movies/ratings?page=${page}&size=20`).then(res => res.json())

contents.tvSeasonRating = async (userID: string, page: number): Promise<Response> => await request(`${API_USERS}/${userID}/contents/tv_seasons/ratings?page=${page}&size=20`).then(res => res.json())

contents.bookRating = async (userID: string, page: number): Promise<Response> => await request(`${API_USERS}/${userID}/contents/books/ratings?page=${page}&size=20`).then(res => res.json())

contents.allMovies = async (userID: string) => {
    const maxSize = 20
    return await contents.movies(userID)
        .then(res => res.json())
        .then(json => Math.ceil(json.result.action_count.ratings / maxSize))
        .then(count => {
            return Promise.all(
                Array.apply(null, Array(count)).map((i, page) => contents.movieRating(userID, page + 1))
            )
        })
}

contents.allTvSeasons = async (userID: string) => {
    const maxSize = 20
    return await contents.tvSeasons(userID)
        .then(res => res.json())
        .then(json => Math.ceil(json.result.action_count.ratings / maxSize))
        .then(count => {
            return Promise.all(
                Array.apply(null, Array(count)).map((i, page) => contents.tvSeasonRating(userID, page + 1))
            )
        })
}


contents.allBooks = async (userID: string) => {
    const maxSize = 20
    return await contents.books(userID)
        .then(res => res.json())
        .then(json => Math.ceil(json.result.action_count.ratings / maxSize))
        .then(count => {
            return Promise.all(
                Array.apply(null, Array(count)).map((i, page) => contents.bookRating(userID, page + 1))
            )
        })
}

export default contents
