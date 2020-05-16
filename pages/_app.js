import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../style';
import Corner from "../components/Corner";

class _App extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Corner />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    );
  }
}

export default _App;

