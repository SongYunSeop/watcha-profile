import App from 'next/app';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {theme, GlobalStyle} from '../style';
import Corner from "../components/Corner";
import Logo from "../components/Logo";
import {NextComponentType, NextPageContext} from "next";

class _App extends App {
    static async getInitialProps({Component, ctx}: { Component: NextComponentType, ctx: NextPageContext }) {
        let pageProps = {
        };
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // exposes the query to the user
        pageProps["query"] = ctx.query
        return {pageProps}
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyle/>
                    <Logo/>
                    <Corner/>
                    <Component {...pageProps} />
                </>
                <script type="text/javascript"  src="/static/js/airbridge.js" />
            </ThemeProvider>
        );
    }
}


export default _App;

