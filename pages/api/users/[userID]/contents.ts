import {NextApiRequest, NextApiResponse} from 'next'
import contents from "../../../../libs/watcha/contents";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userID} = req.query
    return res.json({
        movies: await contents.movies(userID.toString()).then(response => response.json()).then(json => json.result),
        tvSeasons: await contents.tv_seasons(userID.toString()).then(response => response.json()).then(json => json.result),
        books: await contents.books(userID.toString()).then(response => response.json()).then(json => json.result)
    })
}
