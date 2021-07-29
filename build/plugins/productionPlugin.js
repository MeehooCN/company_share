// css分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'css/[name].css',
    insert: '#app'
  }),
  // new BundleAnalyzerPlugin()
];
