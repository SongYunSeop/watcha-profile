import React, {useEffect, useState} from 'react';
import TvCharts from "../../../components/TvCharts";
import users from "../../../libs/watcha/users";
import AirbridgeWrapper from "../../../libs/airbridge";
import UserCache from "../../../libs/cache";
import ContentsPage from "../../../components/ContentsPage";

const TvSeasons = ({query, userData}) => {
    const userID = query.userID.toString();
    const pageName = "TvSeasons"
    const API_URI = `/api/users/${userID}/contents/tv_seasons`
    const pageURL = `https://watcha-profile.songyunseop.com/users/${userID}/tv_seasons`
    const [contentsData, setContentsData] = useState(null)
    const [page, setPage] = useState(1);
    const [error, setError] = useState({active: false, type: 200});

    const getContentsData = () => {
        fetch(API_URI)
            .then(response => {
                if (response.status != 200) {
                    return setError({active: true, type: response.status})
                }
                return response.json()
            })
            .then(json => setContentsData(json.result))
            .catch(error => {
                setError({active: true, type: 400})
                console.error(error);
            })
    }

    useEffect(() => {
        getContentsData();
        AirbridgeWrapper.getInstance().sendEvent("View", {
            action: pageName,
            label: userID,
            customAttributes: {userName: userData.name}
        })

    }, []);

    return <ContentsPage
        userData={userData}
        page={page}
        contentsData={contentsData}
        error={error}
        pageName={pageName}
        pageURL={pageURL}
        ChartComponent={TvCharts}
        handleScrollCallback={e => setPage(page + 1)}
        handleClickMore={e => setPage(page + 1)}/>
};


export default TvSeasons;

TvSeasons.getInitialProps = async (props) => {
    const query = props.query
    const userID = props.query.userID.toString();
    const userData = await users(userID).then(res => res.json()).then(json => json.result)
    const userCache = UserCache.getInstance().cache
    userCache.set(userID, userData)
    return {query, userData}
}
