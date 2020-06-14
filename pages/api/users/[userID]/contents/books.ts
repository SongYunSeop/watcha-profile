import {NextApiRequest, NextApiResponse} from "next";
import getBooks from "../../../../../libs/watchaProfile/contents/books";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userID} = req.query
    const result = await getBooks(userID)
    res.json({result: result})
}
