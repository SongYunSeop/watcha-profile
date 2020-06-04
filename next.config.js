const withSourceMaps = require('@zeit/next-source-maps');
const withPWA = require('next-pwa');

module.exports = withSourceMaps(withPWA({
    target: "serverless",
    pwa: {
        dest: 'public',
    },
    webpack(config, _options) {
        return config;
    }
}));
