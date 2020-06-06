import {API_USERS} from './constatns';
import request from "./request";
import users from "./users";

const friends = async (userID: string, page: number = 1): Promise<Response> => await request(`${API_USERS}/${userID}/friends?page=${page}&size=20`).then(res => res.json())

friends.allFriends = async (userID: string) => {
    const maxSize = 20
    const maxPage = 100

    return await users(userID)
        .then(res => res.json())
        .then(json => Math.min(Math.ceil(json.result.friends_count / maxSize), maxPage))
        .then(count => {
            return Promise.all(
                Array.apply(null, Array(count)).map((i, page) => friends(userID, page + 1))
            )
        })
}

export default friends
