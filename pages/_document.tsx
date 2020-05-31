import Document from 'next/document';
import {ServerStyleSheet} from 'styled-components';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', (err) => {
    Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
    Sentry.captureException(err);
});


class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => {
                return originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
                });
            }


            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
}

export default MyDocument;

