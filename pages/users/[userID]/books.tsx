import React, {useEffect, useState} from 'react';
import {Error, Head, UserInfo} from '../../../components';
import BookCharts from "../../../components/BookCharts";
import users from "../../../libs/watcha/users";
import AirbridgeWrapper from "../../../libs/airbridge";
import UserCache from "../../../libs/cache";
import Contents from "../../../components/Contents";

const Books = ({query, userData}) => {
    const userID = query.userID.toString();
    const pageName = "Books"
    const API_URI = `/api/users/${userID}/contents/books`
    const [contentsData, setContentsData] = useState(null)
    const [page, setPage] = useState(1);
    const [error, setError] = useState({active: false, type: 200});
    const pageSize = 9
    const pageIndex = page * pageSize

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

    const getCurrentContents = () => {
        return contentsData
            .slice(0, pageIndex)
            .map(({content, user_content_action}) => ({
                code: content.code.toString(),
                imageUrl: content.poster.large,
                title: content.title,
                author: content.author_names.join(', '),
                year: content.year.toString(),
                avg_rating: (content.ratings_avg / 2).toFixed(1),
                user_rating: (user_content_action.rating / 2).toFixed(1)
            }))
    }

    useEffect(() => {
        getContentsData();
        AirbridgeWrapper.getInstance().sendEvent("View", {
            action: pageName,
            label: userID,
            customAttributes: {userName: userData.name}
        })
    }, []);

    return (
        <main>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userData.name ? `Watcha Profile | ${userData.name}` : 'Watcha Profile'}`}
                          url={`https://watcha-profile.songyunseop.com/users/${userID}/books`}/>
                    {userData && <UserInfo userData={userData}/>}
                    {contentsData != null && contentsData.length > 0 && <BookCharts contentData={contentsData}/>}
                    {contentsData != null && contentsData.length > 0 && (
                        <Contents
                            pageName={pageName}
                            contentsData={getCurrentContents()}
                            onClickMore={() => {
                                setPage(page + 1)
                            }}/>
                    )}
                </>
            )}
        </main>
    );
};


export default Books;

Books.getInitialProps = async (props) => {
    const query = props.query
    const userID = props.query.userID.toString();
    const userData = await users(userID).then(res => res.json()).then(json => json.result)
    const userCache = UserCache.getInstance().cache
    userCache.set(userID, userData)
    return {query, userData}
}
