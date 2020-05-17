import { Section } from '../style';
import SearchResultsStyles from "./styles/SearchResultsStyles";
import React from "react";
import FlipMove from 'react-flip-move';
import SearchedUser from "./SearchedUser";

const SearchResults = ({searchResults, onClickItem, onClickMore}) => {

    const renderSearchedUser = (user) => {
        return (
            <li key={user.code.toString} onClick={e=> {onClickItem(user.code)}}>
                <SearchedUser
                    code={user.code}
                    imageUrl={user.photo.large}
                    name={user.name}
                    bio={user.bio}
                    ratings_count={user.ratings_count}
                />
            </li>
        )
    }

    return (
        <div>
            {searchResults && (
                <SearchResultsStyles>
                    <div className="searchResultsContainer">
                        <FlipMove typeName="ul">
                            {searchResults.map(user => renderSearchedUser(user))}
                            <li key={'more'} onClick={onClickMore}>
                                <div className="searchedUser" >
                                    <div className="searchedUser__photo avatar"/>
                                    <div className="searchedUser__info">
                                        <div>
                                            <span className="searchedUser__info__name">load more...</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </FlipMove>
                    </div>
                </SearchResultsStyles>
            )}
        </div>
    )
}

export default SearchResults