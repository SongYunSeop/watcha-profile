import React, {useState} from 'react';
import Router from 'next/router'
import PropTypes from 'prop-types';
import {Error, Head, UserInfo, Footer} from '../../components';
import Contents from "../../components/Contents";
import users from '../../libs/watcha/users'
import contents from '../../libs/watcha/contents'

const User = ({query, userData, movies, tv_seasons, books}) => {
    const userID = query.userID.toString();
    const [error, setError] = useState({active: false, type: 200});

    return (
        <main>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userID ? `Watcha Profile | ${userID}` : 'Watcha Profile'}`}/>

                    {userData && <UserInfo userData={userData}/>}
                    {movies && movies.action_count.ratings > 0 && <Contents
                        contentType='movie'
                        data={movies}
                        onClickDetail={e => {
                            Router.push({pathname: `/users/${userID}/movies`})
                        }}/>}
                    {tv_seasons && tv_seasons.action_count.ratings > 0 && <Contents
                        contentType='tv'
                        data={tv_seasons}
                        onClickDetail={e => {
                            Router.push({pathname: `/users/${userID}/tv_seasons`})
                        }}/>}
                    {books && books.action_count.ratings > 0 && <Contents
                        contentType='book'
                        data={books}
                        onClickDetail={e => {
                            Router.push({pathname: `/users/${userID}/books`})
                        }}/>}
                    <Footer/>
                </>
            )}
        </main>
    );
};

User.propTypes = {
    query: PropTypes.object,
};

export default User;

User.getInitialProps = async (props) => {
    const query = props.query
    const userID = props.query.userID.toString();
    const userData = await users(userID).then(res => res.json()).then(json => json.result)
    const movies = await contents.movies(userID).then(res => res.json()).then(json => json.result)
    const tv_seasons = await contents.tv_seasons(userID).then(res => res.json()).then(json => json.result)
    const books = await contents.books(userID).then(res => res.json()).then(json => json.result)
    return {query, userData, movies, tv_seasons, books}
}
