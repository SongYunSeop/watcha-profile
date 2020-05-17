import {API_SEARCH} from './constatns';
import request from "./request";

export default async (query: string, page: string): Promise<Response> => await request(`${API_SEARCH}/users?query=${query}&page=${page}&size=5`)
