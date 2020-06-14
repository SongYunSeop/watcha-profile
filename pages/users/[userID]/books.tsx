import React, {useEffect, useState} from 'react';
import ContentsPage from "../../../components/ContentsPage";
import BookCharts from "../../../components/BookCharts";
import AirbridgeWrapper from "../../../libs/airbridge";
import getUserInfo from "../../../libs/watchaProfile/users";

const Books = ({query, pathname, userData}) => {
    const userID = query.userID.toString();
    const pageName = "Books"
    const pageURL = `https://watcha-profile.songyunseop.com/users/${userID}/books`
    const API_URI = `/api/users/${userID}/contents/books`
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
        pathname={pathname}
        page={page}
        contentsData={contentsData}
        error={error}
        pageName={pageName}
        pageURL={pageURL}
        ChartComponent={BookCharts}
        handleScrollCallback={e => setPage(page + 1)}
        handleClickMore={e => setPage(page + 1)}/>
};


export default Books;

Books.getInitialProps = async (props) => {
    const query = props.query
    const pathname = props.pathname
    const userID = props.query.userID.toString();
    const userData = await getUserInfo(userID)
    return {query, pathname, userData}
}
