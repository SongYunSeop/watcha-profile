import styled from 'styled-components';
import {media, mixins, theme} from '../../style';

const {colors} = theme;

const LongChartsStyles = styled.div`
  margin-top: -20rem !important;
  justify-content: center;
  ${media.bp900`
    justify-items: center;
    margin-top: -14rem !important;
  `};

  .chart {
    background-color: ${colors.white};
    padding: 2rem;
    border-radius: 0.25rem;
    box-shadow: 0 5px 30px -15px rgba(0, 0, 0, 0.2);
    ${media.bp400`
      padding: 2rem 1rem;
    `};

    header {
      ${mixins.flexBetween};
      h2 {
        font-size: 1.5rem;
      }
    }
    p {
      color: ${colors.grey2};
    }
    .chart-progress {
      text-align: center;
      font-size: 2em;
      margin: 0 auto;
    }
  }
`;

export default LongChartsStyles;
