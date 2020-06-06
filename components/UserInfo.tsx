import React from 'react';
import PropTypes from 'prop-types';
import UserInfoStyles from './styles/UserInfoStyles';
import {Section} from "../style";
import Link from 'next/link'


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
                    <a href={`/users/${userData.code}/movies`} className={`stats__item ${pathname.indexOf('movies') > 0 ? 'current' : ''}`}>
                        <span className="num">{userData.action_counts.movies.ratings}</span>
                        <span className="num-label">Movies</span>
                    </a>
                    <a href={`/users/${userData.code}/tv_seasons`} className={`stats__item ${pathname.indexOf('tv_seasons') > 0 ? 'current' : ''}`}>
                        <span className="num">{userData.action_counts.tv_seasons.ratings}</span>
                        <span className="num-label">TV</span>
                    </a>
                    <a href={`/users/${userData.code}/books`} className={`stats__item ${pathname.indexOf('books') > 0 ? 'current' : ''}`}>
                        <span className="num">{userData.action_counts.books.ratings}</span>
                        <span className="num-label">Books</span>
                    </a>
                    <a href={`/users/${userData.code}/friends`} className={`stats__item ${pathname.indexOf('friends') > 0 ? 'current' : ''}`}>
                        <span className="num">{userData.friends_count}</span>
                        <span className="num-label">Friends</span>
                    </a>
                    <a href={`/users/${userData.code}/followers`} className={`stats__item ${pathname.indexOf('followers') > 0 ? 'current' : ''}`}>
                        <span className="num">{userData.follower_count}</span>
                        <span className="num-label">Followers</span>
                    </a>
                </div>
            </UserInfoStyles>
        )}
    </Section>
);

UserInfo.propTypes = {
    userData: PropTypes.object.isRequired,
};

export default UserInfo;

