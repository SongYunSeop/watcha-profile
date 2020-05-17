import styled from 'styled-components';
import { theme, mixins, media } from '../../style';
const { colors, fonts } = theme;

const SearchResultsStyles = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  text-align: center;

  ${media.bp600`
    padding-top: 4rem;
  `};
  
  .searchResultsContainer {
    width: 100%;
    max-height: 200px;
    overflow: scroll;
    background-color: ${colors.darkGrey};
    .searchedUser{
      display: flex;
      height: 60px;
      padding: 0.3rem 0.8rem;
      border-bottom: 1px solid;
      
      &__photo {
        margin-right: 12px;
      }
      
      &__info {
        width: 100%;
        text-align: left;
        
        &__name {
          font-size: 1.2rem;
          font-weight: 500;
        }
        &__ratings {
          float: right;
          svg {
            color: rgb(255, 222, 54);
            float: left;
          }
          span {
            line-height: 28px;
            font-size: 1.2rem;
          }
        }
        &__bio {
          font-style: italic;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: -0.5px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

        }
      }
    }
  }

  .avatar {
    ${mixins.flexCenter};
    border-radius: 100%;
    width: 58px;
    height: 50px;
    background-size: cover;
    background-repeat: no-repeat;
    img {
      border-radius: 100%;
    }
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: ${colors.offWhite};
    ${media.bp400`
      font-size: 2rem;
    `};
  }
  h3 {
    color: ${colors.lightblue};
  }

  a {
    color: ${colors.lightestBlue};
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  .info {
    ${mixins.flexCenter};
    ${media.bp600`
      display: block;
    `};

    &__item {
      ${mixins.flexCenter};
      margin: 0 1rem 0.5rem;
      white-space: nowrap;

      svg {
        margin-right: 10px;
      }
    }
  }
`;

export default SearchResultsStyles;
