import React from 'react';
import NextHead from 'next/head';

const defaultTitle: string = 'Watcha Profile';
const defaultDescription: string = 'A nicer look at your Watcha profile!';
const defaultOGURL: string = 'https://watcha-profile.songyunseop.com';
const defaultOGImage: string = 'https://watcha-profile.songyunseop.com/static/og.png';

const Head = props => (
    <NextHead>
        <meta charSet="UTF-8"/>
        <title>{props.title || defaultTitle}</title>
        <meta name="description" content={props.description || defaultDescription}/>
        <meta name='viewport'
              content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>
        <link rel="icon" href="/static/favicons/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/static/favicons/apple-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png"/>
        <link rel="manifest" href="/static/favicons/manifest.json"/>
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#F92F8A"/>
        <meta name="msapplication-TileColor" content="#F92F8A"/>
        <meta name="theme-color" content="#1A1E22"/>
        <meta property="og:url" content={props.url || defaultOGURL}/>
        <meta property="og:title" content={props.title || defaultTitle}/>
        <meta property="og:description" content={props.description || defaultDescription}/>
        <meta name="twitter:site" content={props.url || defaultOGURL}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content={props.ogImage || defaultOGImage}/>
        <meta name="twitter:description" content={props.description || defaultDescription}/>
        <meta name="twitter:creator" content={'@songyunseop'}/>
        <meta name="twitter:title" content={props.title || defaultTitle}/>
        <meta property="og:type" content={"website"}/>
        <meta property="og:image" content={props.ogImage || defaultOGImage}/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>

        <meta name='application-name' content={props.title}/>
        <meta name='apple-mobile-web-app-capable' content='yes'/>
        <meta name='apple-mobile-web-app-status-bar-style' content='default'/>
        <meta name='apple-mobile-web-app-title' content={props.title || defaultTitle}/>
        <meta name='format-detection' content='telephone=no'/>
        <meta name='mobile-web-app-capable' content='yes'/>

    </NextHead>
);

export default Head;

