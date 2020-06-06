import React from 'react';
import {Section} from '../style';
import ContentsStyles from './styles/ContentsStyles';
import Content from "./Content";
import DummyContent from "./DummyContent";
import FilpMove from "react-flip-move";

const Contents = ({pageName, contentsData, onClickMore, onClickContent}) => {

    const renderContents = () => {
        return contentsData
            .map((content) => (
                <li key={content.code.toString()} onClick={e => {
                    onClickContent(content.code)
                }}>
                    <Content {...content} />
                </li>
            ))
    }

    return (
        <Section>
            <ContentsStyles>
                <header><h2>{pageName}</h2></header>
                <div className="content-list">
                    <FilpMove typeName={"ul"}>
                        {renderContents()}
                        <DummyContent title={'...more'} onClick={onClickMore}/>
                    </FilpMove>
                </div>
            </ContentsStyles>
        </Section>
    )

}

export default Contents
