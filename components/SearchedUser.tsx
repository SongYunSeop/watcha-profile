import React from "react";
import StarIcon from '@material-ui/icons/Star';

const SearchedUser = ({code, imageUrl, name, bio, ratings_count }) => (
        <div className="searchedUser" >
            <div className="searchedUser__photo avatar"
                 style={{backgroundImage: `url(${imageUrl})` }} />
            <div className="searchedUser__info">
                <div>
                    <span className="searchedUser__info__name">{name}</span>
                    <span className="searchedUser__info__ratings"><StarIcon/><span>{ratings_count}</span></span>
                </div>
                <div className="searchedUser__info__bio">{bio}</div>
            </div>
        </div>
)
export default SearchedUser;
