import React, {useEffect, useState} from 'react';
import {Error, Head, UserInfo} from '../../../components';
import {Section} from '../../../style';
import ContentsStyles from '../../../components/styles/ContentsStyles';
import DummyContent from "../../../components/DummyContent";
import Content from "../../../components/Content";
import TvCharts from "../../../components/TvCharts";
import users from "../../../libs/watcha/users";
import AirbridgeWrapper from "../../../libs/airbridge";
import FilpMove from 'react-flip-move'
import UserCache from "../../../libs/cache";

const TvSeasons = ({query, userData}) => {
    const userID = query.userID.toString();
    const [tvSeasons, setTvSeasons] = useState([])
    const [page, setPage] = useState(1);
    const [error, setError] = useState({active: false, type: 200});

    const renderTvSeasons = () => {
        const pageSize = 9
        const pageIndex = page * pageSize
        return tvSeasons
            .slice(0, pageIndex)
            .map(({content, user_content_action}) => (
                <li key={content.code.toString()}>
                    <Content
                        code={content.code.toString()}
                        imageUrl={content.poster.large}
                        title={content.title}
                        author={content.channel_name}
                        year={content.year.toString()}
                        avg_rating={(content.ratings_avg / 2).toFixed(1)}
                        user_rating={(user_content_action.rating / 2).toFixed(1)}/>
                </li>
            ))
    }

    const getTvSeasons = () => {
        fetch(`/api/users/${userID}/contents/tv_seasons`)
            .then(response => {
                if (response.status != 200) {
                    return setError({active: true, type: response.status})
                }
                return response.json()
            })
            .then(json => setTvSeasons(json.result))
            .catch(error => {
                setError({active: true, type: 400})
                console.error(error);
            })
    }


    useEffect(() => {
        getTvSeasons();
        AirbridgeWrapper.getInstance().sendEvent("View", {
            action: "TvSeasons",
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
                          url={`https://watcha-profile.songyunseop.com/users/${userID}/tv_seasons`}/>
                    {userData && <UserInfo userData={userData}/>}
                    {tvSeasons != null && <TvCharts contentData={tvSeasons}/>}
                    {tvSeasons != null && tvSeasons.length > 0 &&
                    (
                        <Section>
                            <ContentsStyles>
                                <header><h2>Movie</h2></header>
                                <div className="content-list">
                                    <FilpMove typeName={"ul"}>
                                        {renderTvSeasons()}
                                        <DummyContent title={'...more'} onClick={() => {
                                            setPage(page + 1)
                                        }}/>
                                    </FilpMove>
                                </div>
                            </ContentsStyles>
                        </Section>
                    )}
                </>
            )}
        </main>
    );
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
