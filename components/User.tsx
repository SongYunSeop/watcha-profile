import React from "react";
import {theme} from '../style';
import StarIcon from "@material-ui/icons/Star";

const {colors} = theme;

const User = ({code, photo, name, bio, ratings_count}) => (
    <a
        href={`/users/${code}`}
        rel="noopener noreferrer"
        className="user">
        <div className="user__photo" style={{backgroundImage: `url(${photo})`}}/>
        <div className="user__name">
            {name}
            <span className="user__ratings">
                <StarIcon style={{color: colors.yellow}}/>{ratings_count}
            </span>

        </div>
        <div className="user__bio">{bio}</div>
    </a>
)
export default User;
