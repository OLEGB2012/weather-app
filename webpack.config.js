// https://peaku.co/questions/7724-i-tried-to-polyfill-modules-in-webpack-5-but-not-working-(reactjs)
module.exports = {
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};
