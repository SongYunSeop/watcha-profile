import {NextApiRequest, NextApiResponse} from "next";
import contents from "../../..//../../libs/watcha/contents";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userID} = req.query
    let data = []
    await contents.allBooks(userID.toString()).then((responses) => {
        return responses.reduce(async (x, json: Object) => {
            await x;
            json["result"].result.forEach(row => {
                data.push(row)
            })
            return data
        }, Promise.resolve())
    }).then(result => {
        res.json({result})
    })
}
