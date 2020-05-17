import React, {useEffect, useState} from 'react';
import Router from 'next/router';
import {Head} from '../components';
import styled from 'styled-components';
import {theme, mixins} from '../style';
import SearchResults from "../components/SearchResults";

const {colors, fonts} = theme;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-image: url("/static/background.jpg");
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  
  color: ${colors.offWhite};
  height: 100vh;

  form {
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
      margin: 2rem;
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

    .submit {
      ${mixins.blueButton};
      margin-top: 3rem;
      filter: none;
    }
  }
`;

const Home = () => {
    const [query, setQuery] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState({active: false, type: 200});
    const handleChange = e => {
        const query = e.target.value
        setQuery(query);
    }
    const onSelectUser = (code) => {
        Router.push({
            pathname: `/users/${code}`,
        });
    }

    const search = () => {
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

    const onClickMore = (e) => {
        setSearchPage(searchPage+1)
    }

    useEffect(() => {
        if (query == "") {
            setSearchPage(1)
            setSearchResults([])
        } else {
            search();
        }
    }, [query, searchPage])

    return (
        <main>
            <Head title="Watcha Profile"/>
            <StyledContainer>
                <form onSubmit={e => {e.preventDefault()}}>
                    <label htmlFor="username">Make Your Watcha Profile</label>
                    <input name="search" type="text" onChange={handleChange}
                           placeholder={'이동진 평론가 or 송윤섭 or Your Name!'}/>
                    {searchResults.length > 0 && (
                        <SearchResults
                            searchResults={searchResults}
                            onClickItem={onSelectUser}
                            onClickMore={onClickMore} />)}
                </form>
            </StyledContainer>
        </main>
    )
}

export default Home;
