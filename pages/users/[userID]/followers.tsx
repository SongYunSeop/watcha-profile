import React, {useCallback, useEffect, useState} from 'react';
import {Error, Head, UserInfo} from '../../../components';
import {Section} from '../../../style';
import AirbridgeWrapper from "../../../libs/airbridge";
import FilpMove from 'react-flip-move'
import FollowersCharts from "../../../components/FollowersCharts";
import User from "../../../components/User";
import UsersStyles from "../../../components/styles/UsersStyles";
import DummyUser from "../../../components/DummyUser";
import _ from 'lodash'
import getUserInfo from "../../../libs/watchaProfile/users";

const Followers = ({query, pathname, userData}) => {
    const userID = query.userID.toString();
    const [followers, setFollowers] = useState([])
    const [page, setPage] = useState(1);
    const [error, setError] = useState({active: false, type: 200});

    const getFollowers = () => {
        fetch(`/api/users/${userID}/followers`)
            .then(response => {
                if (response.status != 200) {
                    return setError({active: true, type: response.status})
                }
                return response.json()
            })
            .then(json => setFollowers(json.result))
            .catch(error => {
                setError({active: true, type: 400})
                console.error(error);
            })
    }

    useEffect(() => {
        getFollowers();
        AirbridgeWrapper.getInstance().sendEvent("View", {
            action: "Followers",
            label: userID,
            customAttributes: {userName: userData.name}
        })
    }, []);

    const renderFollowers = () => {
        const pageSize = 9
        const pageIndex = page * pageSize
        return followers
            .slice(0, pageIndex)
            .map((user) => (
                <li key={user.code.toString()}>
                    <User
                        code={user.code}
                        photo={user.photo.large}
                        name={user.name} bio={user.bio}
                        ratings_count={user.ratings_count}
                    />
                </li>
            ))
    }

    const handleThrottledScroll = useCallback(_.throttle((offsetHeight: number, scrollTop: number, scrollHeight: number) => {
        if (followers && followers.length > 0 && offsetHeight + scrollTop > scrollHeight - 80) {
            setPage(page + 1)
        }
    }, 300), [followers, page]);


    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const {offsetHeight, scrollTop, scrollHeight, className} = e.target as HTMLElement
        if (className.indexOf("chartjs") < 0) {
            handleThrottledScroll(offsetHeight, scrollTop, scrollHeight)
        }
    }

    return (
        <main style={{height: '100vh', overflowY: "auto"}} onScroll={handleScroll}>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userData.name ? `Watcha Profile | ${userData.name}` : 'Watcha Profile'}`}
                          url={`https://watcha-profile.songyunseop.com/users/${userID}/followers`}/>
                    {userData && <UserInfo userData={userData} pathname={pathname}/>}
                    {followers != null && <FollowersCharts userData={userData} chartData={followers.slice(0, 100)}/>}
                    {followers != null && followers.length > 0 &&
                    (
                        <Section>
                            <UsersStyles>
                                <header><h2>Followers</h2></header>
                                <div className="user-list">
                                    <FilpMove typeName={"ul"}>
                                        {renderFollowers()}
                                        <DummyUser title={'...more'} onClick={() => {
                                            setPage(page + 1)
                                        }}/>
                                    </FilpMove>
                                </div>
                            </UsersStyles>
                        </Section>
                    )}
                </>
            )}
        </main>
    )

}

export default Followers;

Followers.getInitialProps = async (props) => {
    const query = props.query
    const pathname = props.pathname
    const userID = props.query.userID.toString();
    const userData = await getUserInfo(userID)
    return {query, pathname, userData}
}
