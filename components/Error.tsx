import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Corner, Head} from '../components';
import {mixins, theme} from '../style';

const {colors} = theme;

const ErrorStyles = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  background-image: url("/static/background.jpg");
  background-size: cover;
  background-position-x: center;
  background-position-y: center;

  
  color: ${colors.offWhite};
  height: 100vh;
  padding-bottom: 20vh;
  font-size: 1.5rem;
  svg {
    color: ${colors.blue};
    margin-bottom: 3rem;
  }
  p {
    font-size: 1rem;
  }
  a {
    color: ${colors.lightblue};
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Error = ({error}) => (
    <ErrorStyles>
        <Head title="Watcha Profile"/>
        <Corner/>
        <h1>Watcha Profile</h1>

        {error && (
            <div>
                {error.type === 403 ? (
                    <p>Try again later.</p>
                ) : error.type === 404 ? (
                    <p>User not found!</p>
                ) : (
                    <p>Oh no! Something went wrong. Try again later!</p>
                )}
            </div>
        )}
    </ErrorStyles>
);

Error.propTypes = {
    error: PropTypes.object.isRequired,
};

export default Error;

