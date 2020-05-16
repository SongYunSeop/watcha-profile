import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import {Section} from '../style';
import ContentsStyles from './styles/ContentsStyles';
import Movie from './Movie'
import TvProgram from "./TvProgram";
import Book from "./Book";

const Contents = ({contentType, data, onClickDetail}) => {
    const sectionTitle = contentType == 'movie'? 'Movies' : contentType == 'tv' ? 'Tv' : 'Book'

    const renderContent = (content) => {
        const ContentComponent = contentType == 'movie' ? Movie : contentType == 'tv' ? TvProgram : Book
        return <ContentComponent {...content} />
    }

    return (
        <Section>
            <ContentsStyles>
                <header><h2>{sectionTitle}</h2></header>
                <div className="content-list">
                    <FlipMove typeName="ul">
                        {data.ratings.result.map(content => renderContent(content))}
                        <li key={'detail'} onClick={onClickDetail}>
                            <a className="content">
                                <div className="content__top">
                                    <div className="content__name">
                                        <h3>...more</h3>
                                    </div>
                                </div>
                            </a>
                        </li>

                    </FlipMove>
                </div>
            </ContentsStyles></Section>
    )

}

Contents.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};
export default Contents
