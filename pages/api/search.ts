import {NextApiRequest, NextApiResponse} from 'next'
import search from "../../libs/watcha/search";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {query, page} = req.query
    search(query.toString(), page.toString() || '1')
        .then(response => response.json())
        .then(json => res.json(json.result))
}
