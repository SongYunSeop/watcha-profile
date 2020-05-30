import {API_USERS} from './constatns';
import request from "./request";
import users from "./users";

const followers = async (userID: string, page: number = 1): Promise<Response> => await request(`${API_USERS}/${userID}/followers?page=${page}&size=20`).then(res => res.json())

followers.allFollowers = async (userID: string) => {
    const maxSize = 20

    return await users(userID)
        .then(res => res.json())
        .then(json => Math.ceil(json.result.follower_count / maxSize))
        .then(count => {
            return Promise.all(
                Array.apply(null, Array(count)).map((i, page) => followers(userID, page + 1))
            )
        })
}

export default followers
