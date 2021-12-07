// css分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 首屏加载压缩工具
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  }),
  // new BundleAnalyzerPlugin()
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
  }),
];
