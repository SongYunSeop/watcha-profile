import React, {useEffect, useState} from 'react';
import {Error, Head, UserInfo, Footer} from '../../../components';
import {Section} from '../../../style';
import ContentsStyles from '../../../components/styles/ContentsStyles';
import DummyContent from "../../../components/DummyContent";
import Content from "../../../components/Content";
import TvCharts from "../../../components/TvCharts";
import users from "../../../libs/watcha/users";
import AirbridgeWrapper from "../../../libs/airbridge";
import contents from "../../../libs/watcha/contents";

const TvSeasons = ({query, userData, tvSeasons}) => {
    const userID = query.userID.toString();
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
                        avg_rating={(content.ratings_avg / 2).toLocaleString()}
                        user_rating={(user_content_action.rating / 2).toLocaleString()}/>
                </li>
            ))
    }

    useEffect(() => {
        AirbridgeWrapper.getInstance().sendEvent("View", {
            action: "TvSeasons",
            label: userID,
            customAttributes: {userName: userData.name}
        })

    }, [userID]);

    return (
        <main>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userID ? `Watcha Profile | ${userID}` : 'Watcha Profile'}`}/>
                    {userData && <UserInfo userData={userData}/>}
                    {tvSeasons && <TvCharts contentData={tvSeasons}/>}
                    {tvSeasons != null && tvSeasons.length > 0 &&
                    (
                        <Section>
                            <ContentsStyles>
                                <header><h2>Movie</h2></header>
                                <div className="content-list">
                                    <ul>
                                        {renderTvSeasons()}
                                        <DummyContent title={'...more'} onClick={() => {
                                            setPage(page + 1)
                                        }}/>
                                    </ul>
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
    let data = []
    const tvSeasons = await contents.allTvSeasons(userID).then((responses) => {
        return responses.reduce(async (x: Array<Object>, json: Object) => {
            await x;
            json["result"].result.forEach(row => {
                data.push(row)
            })
            return data
        }, [])
    }).then((result: Array<Object>) => {
        return result.sort((x, y) => {
            return y["user_content_action"].rating - x["user_content_action"].rating;
        })
    })
    return {query, userData, tvSeasons}
}
