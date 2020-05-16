import {NextApiRequest, NextApiResponse} from 'next'
import users from "../../../libs/watcha/users";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {userID} = req.query
    users(userID.toString())
        .then(response => response.json())
        .then(json => res.json(json.result))
}

