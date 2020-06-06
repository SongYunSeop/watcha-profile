import styled from 'styled-components';
import {media, theme} from '../../style';

const {colors, fonts} = theme;


const ContentDetailStyle = styled.div`
max-width: 40vw;
${media.bp600`
    max-width: 90vw;
`};

padding: 20px;


header {
  h2 {
    margin-bottom: 0.7rem;
  }
  display: flex;
  span {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 0.8rem;
    margin-right: 0.2rem;
  }

}
.contentRating{
   display: flex;
  .contentRatingScore {
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 0.8rem;
    margin-right: 0.2rem;
  }

}
.description {
  letter-spacing: -0.4px;
  font-size: 0.9em;
  margin-bottom: 0.5rem;
}

.poster {
    box-shadow: 3px 3px 10px;
    margin: 12px 0;
}

.comment {
    padding: 8px;
    border-radius: 8px;
    background: #EFEFEF;
    margin-bottom: 12px;

  &__user {
    display: flex;
    &__photo {
        width: 30px;
        height: 30px;
        background-size: cover;
        border-radius: 100%
    }
    &__name {
      font-weight: 700;
      font-size: 1.2rem;
      line-height: 30px;
      padding-left: 6px;
    }
  }
  &__text {
    letter-spacing: -2px;
  }
  &__reaction {
    display: flex;
    justify-content: left;
    align-items: flex-end;
  
  }
}

`


export default ContentDetailStyle;
