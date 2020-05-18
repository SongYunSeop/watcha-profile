import React, {useEffect, useState} from 'react';
import {Error, Head, UserInfo, Footer} from '../../../components';
import FlipMove from 'react-flip-move';
import {Section} from '../../../style';
import ContentsStyles from '../../../components/styles/ContentsStyles';
import DummyContent from "../../../components/DummyContent";
import Content from "../../../components/Content";
import MovieCharts from "../../../components/MovieCharts";

const Movies = (props: any) => {
    const userID = props.query.userID.toString();
    const [userData, setUserData] = useState(null);
    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [error, setError] = useState({active: false, type: 200});

    const getUserData = () => {
        fetch(`/api/users/${userID}`)
            .then(response => {
                if (response.status === 404) {
                    return setError({active: true, type: 404});
                }
                return response.json();
            })
            .then(json => setUserData(json))
            .catch(error => {
                setError({active: true, type: 400});
                console.error('Error:', error);
            });
    };

    const getMovies = () => {
        fetch(`/api/users/${userID}/contents/movies`)
            .then(response => {
                if (response.status === 404) {
                    return setError({active: true, type: 404});
                }
                return response.json();
            })
            .then(json => setMovies(json.result))
            .catch(error => {
                setError({active: true, type: 400});
                console.error('Error:', error);
            });
    }

    const renderMovies = () => {
        const pageSize = 9
        const pageIndex = page * pageSize
        return movies
            .slice(0, pageIndex)
            .map(({content, user_content_action}) => (
                <li key={content.code.toString()}>
                    <Content
                        code={content.code.toString()}
                        imageUrl={content.poster.large}
                        title={content.title}
                        author={content.director_names.join(', ')}
                        year={content.year.toLocaleString()}
                        avg_rating={(content.ratings_avg / 2).toLocaleString()}
                        user_rating={(user_content_action.rating / 2).toLocaleString()}/>
                </li>
            ))
    }

    useEffect(() => {
        getUserData();
        getMovies();
    }, []);

    return (
        <main>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userID ? `Watcha Profile | ${userID}` : 'Watcha Profile'}`}/>
                    {userData && <UserInfo userData={userData}/>}
                    {movies && <MovieCharts contentData={movies}/>}
                    {movies != null && movies.length > 0 &&
                    (
                        <Section>
                            <ContentsStyles>
                                <header><h2>Movie</h2></header>
                                <div className="content-list">
                                    <FlipMove typeName="ul">
                                        {renderMovies()}
                                        <DummyContent title={'...more'} onClick={() => {
                                            setPage(page + 1)
                                        }}/>
                                    </FlipMove>
                                </div>
                            </ContentsStyles>
                        </Section>
                    )}
                </>
            )}
        </main>
    );
};


export default Movies;
