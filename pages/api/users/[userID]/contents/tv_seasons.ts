import {NextApiRequest, NextApiResponse} from "next";
import getTvSeasons from "../../../../../libs/watchaProfile/contents/tv_seasons";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userID} = req.query
    const result = await getTvSeasons(userID)
    res.json({result: result})
}
