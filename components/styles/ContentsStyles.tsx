import styled from 'styled-components';
import {theme, mixins, media} from '../../style';

const {colors, fonts} = theme;

const ContentsStyles = styled.div`
  .dropdown-wrapper {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: ${colors.grey};

    .label {
      margin: 0 1rem;
    }
  }
  .content-list {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      grid-gap: 1rem;

      li {
        .content {
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

          h3 {
            ${mixins.ellipsis};
            color: ${colors.darkGrey};
            margin-bottom: 0.75rem;
            font-size: 18px;
            font-family: ${fonts.mono};
            font-weight: 500;
            letter-spacing: -0.5px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 200px;
          }

          p {
            font-size: 14px;
            margin-bottom: 2rem;
          }
          .movie__poster {
              width: 200px;
          }

          &__header {
            margin-bottom: 2rem;
          }

          &__name {
            display: flex;
            align-items: center;
            h3 {
                margin: 0;
                font-weight: 700;
                line-height: 34px;
            }
          }

          &__top {
            ${mixins.flexBetween};
            line-height: 34px;
            
            &__title {
                font-weight: 900;
                max-width: 150px;
                ${mixins.ellipsis}
            }
            
            &__year {
                font-size: 14px;
            }
          }
          
          &__info {
            ${mixins.flexBetween};
            font-size: 13px;
            color: ${colors.grey};
            
            &__author {
                font-weight: 700
            }
          }
          
           
          &__ratings {
            font-size: 12px;
            font-weight: 700;
            color: ${colors.black};
            
            
            svg {
            }
            
            &__line {
            }

          }
        }
      }
    }
  }
`;

export default ContentsStyles;
