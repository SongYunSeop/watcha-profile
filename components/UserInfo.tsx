import React from 'react';
import PropTypes from 'prop-types';
import UserInfoStyles from './styles/UserInfoStyles';
import { Section } from '../style';

const UserInfo = ({ userData }) => (
  <Section image>
    {userData && (
      <UserInfoStyles>
        {userData.photo.original && (
          <div className="avatar">
            <img src={userData.photo.original} alt="avatar" />
          </div>
        )}

        {userData.name && <h1>{userData.name}</h1>}

        {userData.bio && <h4>{userData.bio}</h4>}

        <div className="stats">
          <div className="stats__item">
            <span className="num">{userData.action_counts.movies.ratings}</span>
            <span className="num-label">Movies</span>
          </div>
          <div className="stats__item">
            <span className="num">{userData.action_counts.tv_seasons.ratings}</span>
            <span className="num-label">TV</span>
          </div>
          <div className="stats__item">
            <span className="num">{userData.action_counts.books.ratings}</span>
            <span className="num-label">Books</span>
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

