import App from 'next/app';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle, theme} from '../style';
import Corner from "../components/Corner";
import Logo from "../components/Logo";
import {NextComponentType, NextPageContext} from "next";
import AirbridgeSDK from "../libs/airbridge/components/AirbridgeSDK";
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: "https://7ef0a84797c840698504bb3d68d81b8f@o400408.ingest.sentry.io/5258829"});

class _App extends App {
    static async getInitialProps({Component, ctx}: { Component: NextComponentType, ctx: NextPageContext }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // exposes the query to the user
        pageProps["query"] = ctx.query
        pageProps["pathname"] = ctx.pathname
        return {pageProps}
    }

    componentDidCatch(error, errorInfo) {
        Sentry.withScope((scope) => {
            Object.keys(errorInfo).forEach((key) => {
                scope.setExtra(key, errorInfo[key]);
            });

            Sentry.captureException(error);
        });

        super.componentDidCatch(error, errorInfo);
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
                <script type="text/javascript" src="/static/js/airbridge.js"/>
                <AirbridgeSDK app={"watchaprofile"} webToken={"1715f9b3f0714e06bb0b33afd4309f52"}/>
            </ThemeProvider>
        );
    }
}


export default _App;

