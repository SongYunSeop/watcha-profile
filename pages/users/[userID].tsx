import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Error, Head, UserInfo} from '../../components';
import AirbridgeWrapper from "../../libs/airbridge";
import getUserInfo from "../../libs/watchaProfile/users";

const User = ({query, pathname, userData}) => {
    const userID = query.userID.toString();
    const [error, setError] = useState({active: false, type: 200});

    useEffect(() => {
        AirbridgeWrapper.getInstance().sendEvent("View", {
            action: "Users",
            label: userID,
            customAttributes: {userName: userData.name}
        })
    }, [])

    return (
        <main>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userData.name ? `Watcha Profile | ${userData.name}` : 'Watcha Profile'}`}
                          url={`https://watcha-profile.songyunseop.com/users/${userID}`}/>
                    {userData && <UserInfo userData={userData} pathname={pathname}/>}
                </>
            )}
        </main>
    );
};

User.propTypes = {
    query: PropTypes.object,
};

export default User;

User.getInitialProps = async (props) => {
    const query = props.query
    const pathname = props.pathname
    const userID = props.query.userID.toString();
    const userData = await getUserInfo(userID)
    return {query, pathname, userData}
}
