import {API_USERS} from './constatns';
import request from "./request";

export default async (userID: string): Promise<Response> => await request(`${API_USERS}/${userID}`)
