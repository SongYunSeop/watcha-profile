import React, {useCallback, useEffect, useState} from 'react';
import Router from 'next/router';
import {Head} from '../components';
import styled from 'styled-components';
import {media, mixins, theme} from '../style';
import SearchResults from "../components/SearchResults";
import _ from 'lodash'
import AirbridgeWrapper from "../libs/airbridge";
import FilpMove from 'react-flip-move'
import getRecentUser from "../libs/watchaProfile/users/recentUsers";

const {colors, fonts} = theme;

const StyledContainer = styled.div`
  background-image: url("/static/background.jpg");
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  
  color: ${colors.offWhite};
  height: 100vh;
  padding-top: 17vh;
  .recentUsers {
    max-width: calc(100% - 200px);
    margin: 0 auto;
    overflow-x: scroll;
    padding-bottom: 12px;
    ${media.bp600`
      max-width: calc(100% - 20px);
    `};
    
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1em));
        grid-gap: 1rem;
    }

    .user {
        background: ${colors.offWhite};
        color: ${colors.darkGrey};
        border-radius: 0.25rem;
        padding: 4px;
        font-size: 0.9em;
        width: 200px;
        cursor: pointer;
        ${mixins.flexCenter};

        &__avatar {
            border-radius: 100%;
            width: 40px;
            max-width: 40px;
            height: 40px;
            background-size: cover;
            background-repeat: no-repeat;
            margin-right: 4px;
        }
        &__name {
            font-weight: 700;
            max-width: calc( 100% - 50px);
            ${mixins.ellipsis};
            line-height: 40px;
        }
        //&__rating { font-weight: 500;
        //    font-size: 0.8em;
        //}
    }
  }

  form {
    margin: 0 auto;
    background-color: transparent;
    border-radius: 5px;
    padding: 2rem;
    margin-bottom: 20vh;
    max-width: 800px;
    text-align: center;
    svg {
      color: ${colors.blue};
    }
    label {
      display: block;
      font-size: 2.3rem;
      font-weight: 500;
      margin: 1.5rem;
    }
    input {
      background-color: ${colors.offWhite};
      outline: 0;
      border: 0;
      border-radius: 0.25rem;
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      padding: 1rem;
      color: ${colors.darkGrey};
      font-family: ${fonts.mono};
      font-size: 0.8rem;
      font-weight: 300;
      text-align: center;
    }
  }
`;

const Home = ({recentUsers}) => {
    const [query, setQuery] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState({active: false, type: 200});

    const onSelectUser = (code) => {
        AirbridgeWrapper.getInstance().sendEvent("SelectUser", {action: code})
        Router.push({
            pathname: `/users/${code}`,
        });
    }

    const search = () => {
        AirbridgeWrapper.getInstance().sendEvent("SearchUser", {action: query})
        fetch(`/api/search?query=${query}&page=${searchPage}`)
            .then(response => {
                if (response.status === 404) {
                    return setError({active: true, type: 404});
                }
                return response.json();
            })
            .then(json => {
                if (searchPage == 1)
                    setSearchResults(json.result)
                else
                    setSearchResults(searchResults.concat(json.result))
            })
            .catch(error => {
                setError({active: true, type: 400});
                console.error('Error:', error);
            });
    }

    const handleDebounceInput = useCallback(_.debounce((value: string) => {
        setQuery(value);
    }, 300), []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleDebounceInput(e.target.value);
    }

    const onClickMore = (e) => {
        setSearchPage(searchPage + 1)
    }

    useEffect(() => {
        if (query == "") {
            setSearchPage(1)
            setSearchResults([])
        } else {
            search();
        }
    }, [query, searchPage])

    const renderRecentUsers = () => {
        return recentUsers.map(user => {
            return (
                <li key={user.code}>
                    <a href={`/users/${user.code}`}>
                        <div className="user">
                            <span className="user__avatar" style={{backgroundImage: `url(${user.photo.small})`}}/>
                            <span className="user__name">{user.name}</span>
                        </div>
                        {/*<span className="user__rating"><StarIcon style={{color: colors.yellow}}/>{user.ratings_count}</span>*/}
                    </a>
                </li>
            )
        })
    }

    return (
        <main>
            <Head title="Watcha Profile" ogImage={'https://watcha-profile.songyunseop.com/static/og-index.png'}/>
            <StyledContainer>
                <div className="recentUsers">
                    <FilpMove typeName="ul">
                        {recentUsers && recentUsers.length > 0 && (
                            renderRecentUsers()
                        )}
                    </FilpMove>
                </div>
                <form onSubmit={e => {
                    e.preventDefault()
                }}>
                    <label htmlFor="username">Make Your Watcha Profile</label>
                    <input name="search" type="text" onChange={handleSearch}
                           placeholder={'이동진 평론가 or 물론들롱 or Your Name!'}/>
                    {(query != "" && searchResults.length > 0) && (
                        <SearchResults
                            searchResults={searchResults}
                            onClickItem={onSelectUser}
                            onClickMore={onClickMore}/>)}
                </form>
            </StyledContainer>
        </main>
    )
}

export default Home;

Home.getInitialProps = async (props) => {
    const recentUsers = await getRecentUser()

    return {recentUsers}
}
