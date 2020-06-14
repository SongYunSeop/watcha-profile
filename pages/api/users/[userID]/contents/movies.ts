import {NextApiRequest, NextApiResponse} from "next";
import getMovies from "../../../../../libs/watchaProfile/contents/movies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userID} = req.query
    const result = await getMovies(userID)
    res.json({result: result})
}
