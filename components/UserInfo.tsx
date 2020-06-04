import React from 'react';
import PropTypes from 'prop-types';
import UserInfoStyles from './styles/UserInfoStyles';
import Router from "next/router";
import {Section} from "../style";

const UserInfo = ({userData, pathname}) => (
    <Section image style={{height: '100vh'}}>
        {userData && (
            <UserInfoStyles>
                {userData.photo.small && (
                    <div className="avatar">
                        <img src={userData.photo.large} alt="avatar"/>
                    </div>
                )}

                {userData.name && <h1>{userData.name}</h1>}

                {userData.bio && <h4>{userData.bio}</h4>}

                <div className="stats">
                    <div className={`stats__item ${pathname.indexOf('movies') > 0 ? 'current' : ''}`} onClick={() => {
                        Router.push({pathname: `/users/${userData.code}/movies`,});
                    }}>
                        <span className="num">{userData.action_counts.movies.ratings}</span>
                        <span className="num-label">Movies</span>
                    </div>
                    <div className={`stats__item ${pathname.indexOf('tv_seasons') > 0 ? 'current' : ''}`}
                         onClick={() => {
                             Router.push({pathname: `/users/${userData.code}/tv_seasons`,});
                         }}>
                        <span className="num">{userData.action_counts.tv_seasons.ratings}</span>
                        <span className="num-label">TV</span>
                    </div>
                    <div className={`stats__item ${pathname.indexOf('books') > 0 ? 'current' : ''}`} onClick={() => {
                        Router.push({pathname: `/users/${userData.code}/books`,});
                    }}>
                        <span className="num">{userData.action_counts.books.ratings}</span>
                        <span className="num-label">Books</span>
                    </div>
                    <div className={`stats__item ${pathname.indexOf('friends') > 0 ? 'current' : ''}`} onClick={() => {
                        Router.push({pathname: `/users/${userData.code}/friends`,});
                    }}>
                        <span className="num">{userData.friends_count}</span>
                        <span className="num-label">Friends</span>
                    </div>
                    <div className={`stats__item ${pathname.indexOf('followers') > 0 ? 'current' : ''}`}
                         onClick={() => {
                             Router.push({pathname: `/users/${userData.code}/followers`,});
                         }}>
                        <span className="num">{userData.follower_count}</span>
                        <span className="num-label">Followers</span>
                    </div>
                </div>
            </UserInfoStyles>
        )}
    </Section>
);

UserInfo.propTypes = {
    userData: PropTypes.object.isRequired,
};

export default UserInfo;

