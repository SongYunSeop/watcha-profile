import React, {useEffect, useState} from 'react';
import {Error, Head, UserInfo} from '../../../components';
import {Section} from '../../../style';
import users from "../../../libs/watcha/users";
import AirbridgeWrapper from "../../../libs/airbridge";
import FilpMove from 'react-flip-move'
import UserCache from "../../../libs/cache";
import FollowersCharts from "../../../components/FollowersCharts";
import User from "../../../components/User";
import UsersStyles from "../../../components/styles/UsersStyles";
import DummyUser from "../../../components/DummyUser";

const Followers = ({query, userData}) => {
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


    return (
        <main>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userData.name ? `Watcha Profile | ${userData.name}` : 'Watcha Profile'}`}
                          url={`https://watcha-profile.songyunseop.com/users/${userID}/followers`}/>
                    {userData && <UserInfo userData={userData}/>}
                    {followers != null && <FollowersCharts userData={userData} followersData={followers}/>}
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
