const withSourceMaps = require('@zeit/next-source-maps');
const withPWA = require('next-pwa')

module.exports = withSourceMaps(withPWA({
    target: "serverless",
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    },
    webpack(config, _options) {
        return config;
    }
}));

