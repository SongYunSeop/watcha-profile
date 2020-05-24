import React, {useState, useEffect, forwardRef} from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import {Section} from '../style';
import ContentsStyles from './styles/ContentsStyles';
import Content from "./Content";
import DummyContent from "./DummyContent";

const Contents = ({contentType, data, onClickDetail}) => {
    const sectionTitle = contentType == 'movie' ? 'Movies' : contentType == 'tv' ? 'Tv' : 'Books'

    const renderContent = (content, user_content_action) => {

        let author: string
        if (contentType == 'movie') {
            author = content.director_names.join(', ')
        } else if (contentType == 'tv') {
            author = content.channel_name
        } else {
            author = content.author_names.join(', ')
        }
        return (
            <li key={content.code.toString()}>
                <Content
                    key={content.code.toString()}
                    code={content.code.toString()}
                    imageUrl={content.poster.medium}
                    title={content.title}
                    author={author}
                    year={content.year.toString()}
                    avg_rating={(content.ratings_avg / 2).toLocaleString()}
                    user_rating={(user_content_action.rating / 2).toLocaleString()}/>
            </li>
        )
    }

    return (
        <Section>
            <ContentsStyles>
                <header><h2>{sectionTitle}</h2></header>
                <div className="content-list">
                    <ul>
                        {data.ratings.result.map(({content, user_content_action}) => renderContent(content, user_content_action))}
                        <DummyContent onClick={onClickDetail} title='...more'/>
                    </ul>
                </div>
            </ContentsStyles></Section>
    )

}

Contents.propTypes = {
    data: PropTypes.object.isRequired,
    contentType: PropTypes.string.isRequired,
    onClickDetail: PropTypes.func.isRequired,
};

export default Contents
