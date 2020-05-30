import styled from 'styled-components';
import {media, mixins, theme} from '../../style';

const {colors, fonts} = theme;

const UsersStyles = styled.div`
  .user-list {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      grid-gap: 1rem;

      li {
        .user {
          ${mixins.flexBetween};
          flex-direction: column;
          padding: 2rem;
          height: 100%;
          color: ${colors.grey2};
          background-color: ${colors.white};
          border-radius: 0.25rem;
          box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
          transition: all 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
          ${media.bp600`
            padding: 1.5rem;
          `};

          &:hover,
          &:focus {
            box-shadow: 0 8px 20px -15px rgba(0, 0, 0, 0.2);
          }
          &__photo {
              width: 120px;
              height: 120px;
              background-size: cover;
              border-radius: 100%;
              margin: 0 auto;
          }
          &__name {
                font-weight: 900;
                text-align:center;
                padding: 8px;
          }
          &__ratings {
              float: right;
              position: relative;
              top: -8px;
              font-size: 12px;
              font-weight: 700;
              color: ${colors.black};
              svg { 
                  position: relative;
                  top: 6px;
              }
          }
          &__bio {
                font-size: 0.8rem;
                font-weight: 500;
                text-align:center;
                font-style: italic;
                letter-spacing: -0.5px;
          }
        }
      }
    }
  }
`;

export default UsersStyles;
