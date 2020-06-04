const withSourceMaps = require('@zeit/next-source-maps');
const withPWA = require('next-pwa');

module.exports = withSourceMaps(withPWA({
    target: "serverless",
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
    },
    webpack(config, _options) {
        return config;
    }
}));
