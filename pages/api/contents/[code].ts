import {NextApiRequest, NextApiResponse} from 'next'
import contents from "../../../libs/watcha/contents";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {code} = req.query
    contents(code.toString())
        .then(response => response.json())
        .then(json => res.json(json.result))
}

