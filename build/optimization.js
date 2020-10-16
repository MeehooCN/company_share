module.exports = {
  runtimeChunk: {
    name: 'manifest'
  },
  splitChunks: {
    // 第三方打包
    cacheGroups: {
      default: false,
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'common',
        chunks: 'all'
      },
      highlight: {
        name: 'highlight',
        chunks: 'all',
        priority: 20,
        test: function(module) {
          var context = module.context;
          return context && (context.indexOf('highlight.js') >= 0)
        }
      }
    }
  }
};
