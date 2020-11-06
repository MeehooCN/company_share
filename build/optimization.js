module.exports = {
  runtimeChunk: {
    name: 'manifest'
  },
  splitChunks: {
    maxInitialRequests: 5,
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
        priority: 1,
        test: /highlight.js/
      },
      antd: {
        name: 'antd',
        chunks: 'all',
        priority: 2,
        test: function(module) {
          const context = module.context;
          return context && (
            context.indexOf('antd') >= 0 ||
            context.indexOf('@ant-design') >= 0 ||
            context.indexOf('rc-picker') >= 0 ||
            context.indexOf('rc-table') >= 0 ||
            context.indexOf('rc-tree') >= 0
          );
        }
      },
      react: {
        name: 'react',
        chunks: 'all',
        priority: 3,
        test: /react/
      }
    }
  }
};
