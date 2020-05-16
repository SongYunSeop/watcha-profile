import React from "react";

const TvProgram = ({content, user_content_action}) => (
    <li key={content.code}>
        <a
            href={`https://watcha.com/ko-KR/contents/${content.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="content">
            <div className="movie__poster">
                <img src={content.poster.large}/>
            </div>
            <div className="content__top">
                <div className="content__name">
                    <h3>{content.title}</h3>
                </div>
            </div>
            <div className="content__stats">
                <div className="content__stats--left">
                    <span>{content.channel_name}</span>
                    <span>{content.year.toLocaleString()}</span>
                </div>
                <div className="content__stats--right">
                    <span>{user_content_action.rating.toLocaleString()} / {content.ratings_avg.toLocaleString()}</span>
                </div>
            </div>
        </a>
    </li>
)
export default TvProgram;
