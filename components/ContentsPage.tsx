import React, {useCallback} from 'react';
import {Error, Head, UserInfo} from '../components';
import Contents from "../components/Contents";
import _ from 'lodash'

const ContentsPage = ({userData, pathname, page, contentsData, error, pageName, pageURL, ChartComponent, handleScrollCallback, handleClickMore}) => {
    const pageSize = 9
    const pageIndex = page * pageSize

    const handleThrottledScroll = useCallback(_.throttle((offsetHeight: number, scrollTop: number, scrollHeight: number) => {
        if (contentsData && contentsData.length > 0 && offsetHeight + scrollTop > scrollHeight - 80) {
            handleScrollCallback()
        }
    }, 300), [contentsData, page]);


    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const {offsetHeight, scrollTop, scrollHeight, className} = e.target as HTMLElement
        if (className.indexOf("chartjs") < 0) {
            handleThrottledScroll(offsetHeight, scrollTop, scrollHeight)
        }
    }

    const getCurrentContents = () => {
        return contentsData
            .slice(0, pageIndex)
            .map(({content, user_content_action}) => {
                    const author = pageName == "Movies" ? content.director_names.join(', ') : (pageName == "Books" ? content.author_names.join(', ') : content.channel_name)
                    return {
                        code: content.code.toString(),
                        imageUrl: content.poster.large,
                        title: content.title,
                        author: author,
                        year: content.year.toString(),
                        avg_rating: (content.ratings_avg / 2).toFixed(1),
                        user_rating: (user_content_action.rating / 2).toFixed(1)
                    }

                }
            )
    }
    return (
        <main style={{height: '100vh', overflowY: "auto"}} onScroll={handleScroll}>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userData.name ? `Watcha Profile | ${userData.name}` : 'Watcha Profile'}`}
                          url={pageURL}/>
                    {userData && <UserInfo userData={userData} pathname={pathname}/>}
                    {contentsData != null && contentsData.length > 0 && <ChartComponent contentData={contentsData}/>}
                    {contentsData != null && contentsData.length > 0 && (
                        <Contents
                            pageName={pageName}
                            contentsData={getCurrentContents()}
                            onClickMore={handleClickMore}/>
                    )}
                </>
            )}
        </main>
    );
};


export default ContentsPage;
