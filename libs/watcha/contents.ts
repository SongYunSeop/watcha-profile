import {API_USERS} from './constatns';
import request from "./request";

const movies = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/movies`)

const tv_seasons = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/tv_seasons`)

const books = async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}/contents/books`)

export default {movies, tv_seasons, books}
