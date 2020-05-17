import React, {useEffect, useState} from 'react';
import Router from 'next/router'
import PropTypes from 'prop-types';
import {Error, Head, UserInfo, Footer} from '../../components';
import Contents from "../../components/Contents";

const User = (props: any) => {
    const userID = props.query.userID.toString();
    const [userData, setUserData] = useState(null);
    const [contents, setContents] = useState(null);
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

    const getContents = () => {
        fetch(`/api/users/${userID}/contents`)
            .then(response => {
                if (response.status === 404) {
                    return setError({active: true, type: 404});
                }
                return response.json();
            })
            .then(json => setContents(json))
            .catch(error => {
                setError({active: true, type: 400});
                console.error('Error:', error);
            });

    }


    useEffect(() => {
        getUserData();
        getContents();
    }, []);

    return (
        <main>
            {error && error.active ? (
                <Error error={error}/>
            ) : (
                <>
                    <Head title={`${userID ? `Watcha Profile | ${userID}` : 'Watcha Profile'}`}/>

                    {userData && <UserInfo userData={userData}/>}
                    {contents && <Contents
                        contentType='movie'
                        data={contents.movies}
                        onClickDetail={e => {Router.push({pathname: `/users/${userID}/movies`})}}/>}
                    {contents && <Contents
                        contentType='tv'
                        data={contents.tv_seasons}
                        // onClickDetail={e => {Router.push({pathname: `/users/${userID}/tv_seasons`})}}/>}
                        onClickDetail={e => {alert('Open Soon! 👨‍💻🔥')}}/>}
                    {contents && <Contents
                        contentType='book'
                        data={contents.books}
                        // onClickDetail={e => {Router.push({pathname: `/users/${userID}/books`})}}/>}
                        onClickDetail={e => {alert('Open Soon! 👨‍💻🔥')}}/>}
                        <Footer />
                </>
            )}
        </main>
    );
};

User.propTypes = {
    query: PropTypes.object,
};

export default User;
