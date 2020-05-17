import React, {FormEvent, useState} from 'react';
import Router from 'next/router';
import { Head } from '../components';
import styled from 'styled-components';
import { theme, mixins } from '../style';
const { colors, fonts } = theme;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-image: url("/static/background.jpg");
  background-size: cover;
  background-position-x: center;
  background-position-y: center;

  
  // background-color: ${colors.black};
  // background-image: linear-gradient(${colors.black} 0%, ${colors.darkGrey} 100%);
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
      margin: 4rem;
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

const  Home = ()  => {
  const [userID, setUsername] = useState('');
  const handleChange = e => setUsername(e.target.value);

  return (
    <main>
      <Head title="Watcha Profile" />

      <StyledContainer>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            Router.push({
              pathname: `/users/${userID.replace("https://watcha.com/ko-KR/users/", "")}`,
            });
          }}>
          <label htmlFor="username">Make Your Watcha Profile</label>
          <input name="username" type="text" onChange={handleChange} placeholder={'"nb4xk0MPaqOAz" or "https://watcha.com/ko-KR/users/nb4xk0MPaqOAz"'}/>
        </form>
      </StyledContainer>
    </main>
  )
}

export default Home;
