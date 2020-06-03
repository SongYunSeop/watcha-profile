import React, {useCallback, useEffect, useState} from 'react';
import {Error, Head, UserInfo} from '../../../components';
import {Section} from '../../../style';
import users from "../../../libs/watcha/users";
import AirbridgeWrapper from "../../../libs/airbridge";
import FilpMove from 'react-flip-move'
import UserCache from "../../../libs/cache";
import FriendsCharts from "../../../components/FriendsCharts";
import User from "../../../components/User";
import UsersStyles from "../../../components/styles/UsersStyles";
import DummyUser from "../../../components/DummyUser";
import _ from 'lodash'

const Friends = ({query, userData}) => {
    const userID = query.userID.toString();
    const [friends, setFriends] = useState([])
    const [page, setPage] = useState(1);
    const [error, setError] = useState({active: false, type: 200});

    const getFriends = () => {
        fetch(`/api/users/${userID}/friends`)
            .then(response => {
                if (response.status != 200) {
                    return setError({active: true, type: response.status})
                }
                return response.json()
            })
            .then(json => setFriends(json.result))
            .catch(error => {
                setError({active: true, type: 400})
                console.error(error);
            })
    }

    useEffect(() => {
        getFriends();
        AirbridgeWrapper.getInstance().sendEvent("View", {
            action: "Friends",
            label: userID,
            customAttributes: {userName: userData.name}
        })
    }, []);


    const renderFriends = () => {
        const pageSize = 9
        const pageIndex = page * pageSize
        return friends
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
        if (friends && friends.length > 0 && offsetHeight + scrollTop > scrollHeight - 80) {
            setPage(page + 1)
        }
    }, 300), [friends, page]);


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
                          url={`https://watcha-profile.songyunseop.com/users/${userID}/friends`}/>
                    {userData && <UserInfo userData={userData}/>}
                    {friends != null && <FriendsCharts userData={userData} friendsData={friends}/>}
                    {friends != null && friends.length > 0 &&
                    (
                        <Section>
                            <UsersStyles>
                                <header><h2>Friends</h2></header>
                                <div className="user-list">
                                    <FilpMove typeName={"ul"}>
                                        {renderFriends()}
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

export default Friends;

Friends.getInitialProps = async (props) => {
    const query = props.query
    const userID = props.query.userID.toString();
    const userCache = UserCache.getInstance().cache
    let userData;
    if (userCache.has(userID)) {
        userData = userCache.get(userID)
    } else {
        userData = await users(userID).then(res => res.json()).then(json => json.result)
        userCache.set(userID, userData)
    }
    return {query, userData}
}
