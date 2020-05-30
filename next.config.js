const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withSourceMaps({
  target: "serverless",
  webpack(config, _options) {
    return config;
  }
});

