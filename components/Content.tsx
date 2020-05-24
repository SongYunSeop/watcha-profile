import React from "react";
import Rating from '@material-ui/lab/Rating';
import {theme} from '../style';

const {colors} = theme;

const Content = ({code, imageUrl, title, author, year, avg_rating, user_rating}) => (
    <a
        href={`https://watcha.com/ko-KR/contents/${code}`}
        target="_blank"
        rel="noopener noreferrer"
        className="content">
        <div className="movie__poster">
            <img src={imageUrl} alt={`${title} Poster`}/>
        </div>
        <div className="content__top">
            <span className="content__top__title">{title}</span>
            <span className="content__top__year">{year}</span>
        </div>
        <div className="content__info">
            <span className="content__info__author">{author}</span>
        </div>
        <div className="content__ratings">
            <div className="content__ratings__line">
                <span>User({user_rating})</span> <Rating name="half-rating" defaultValue={user_rating} precision={0.1}
                                                         readOnly style={{color: colors.yellow}}/>
            </div>
            <div className="content__ratings__line">
                <span>Avg({avg_rating})</span> <Rating name="half-rating" defaultValue={avg_rating} precision={0.1}
                                                       readOnly style={{color: colors.yellow}}/>
            </div>
        </div>
    </a>
)
export default Content;
