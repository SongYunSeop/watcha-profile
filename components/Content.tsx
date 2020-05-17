import React from "react";
import StarIcon from '@material-ui/icons/Star';
import PeopleIcon from '@material-ui/icons/People';
import { theme } from '../style';
const { colors } = theme;

const Content = ({code, imageUrl, title, author, year, avg_rating, user_rating }) => (
        <a
            href={`https://watcha.com/ko-KR/contents/${code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="content">
            <div className="movie__poster">
                <img src={imageUrl} alt={`${title} Poster`}/>
            </div>
            <div className="content__top">
                <div className="content__name">
                    <h3>{title}</h3>
                </div>
            </div>
            <div className="content__stats">
                <div className="content__stats--left">
                    <span>{author}</span>
                    <span>{year}</span>
                </div>
                <div className="content__stats--right">
                    <StarIcon style={{color: colors.yellow}}/><span>{user_rating} / {avg_rating}</span>
                </div>
            </div>
        </a>
)
export default Content;
