import styled from 'styled-components';
import { theme } from '../style';
const { colors } = theme;

const LogoStyles = styled.div`
  .logo {
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    padding: 1em;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 1.5em;
    &:hover {
        color: #ff5781;
    }
  }
`;

const Corner = () => (
  <LogoStyles>
    <a
      href="/"
      className="logo"
      aria-label="Watcha Profile">
        Watcha Profile
    </a>
  </LogoStyles>
);

export default Corner;
