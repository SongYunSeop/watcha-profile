import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import {Section} from '../style';
import ContentsStyles from './styles/ContentsStyles';
import Content from "./Content";
import DummyContent from "./DummyContent";

const Contents = ({contentType, data, onClickDetail}) => {
    const sectionTitle = contentType == 'movie' ? 'Movies' : contentType == 'tv' ? 'Tv' : 'Books'

    const renderContent = ({content, user_content_action}) => {

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
                imageUrl={content.poster.large}
                title={content.title}
                author={author}
                year={content.year.toLocaleString()}
                avg_rating={content.ratings_avg.toLocaleString()}
                user_rating={user_content_action.rating.toLocaleString()}/>
            </li>
        )
    }

    return (
        <Section>
            <ContentsStyles>
                <header><h2>{sectionTitle}</h2></header>
                <div className="content-list">
                    <FlipMove typeName="ul">
                        {data.ratings.result.map(contentData => renderContent(contentData))}
                        <DummyContent onClick={onClickDetail} title='...more' />
                    </FlipMove>
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
