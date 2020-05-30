import {NextApiRequest, NextApiResponse} from 'next'
import friends from "../../../../libs/watcha/friends";

interface UserObect {
    "code": string
    "name": string
    "photo": {
        "large": string
        "small": string
    }
    "watcha_play_user": boolean
    "official_user": boolean
    "bio": string
    "comments_count": number
    "ratings_count": number
    "wishes_count": number
    "decks_count": number
    "current_context": any
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userID} = req.query
    let data = []
    await friends.allFriends(userID.toString()).then((responses) => {
        return responses
            .reduce(async (x, json: JSON) => {
                await x;
                json["result"].result.forEach(async row => {
                    await data.push(row)
                })
                return data
            }, Promise.resolve())
    }).then((result: Array<UserObect>) => {
        const sortedResult = result.sort((x, y) => {
            return y.ratings_count - x.ratings_count
        })
        res.json({result: sortedResult})
    })
}
