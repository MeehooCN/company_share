/**
 * @description: js 配置
 * @author: cnn
 * @createTime: 2020/7/16 17:22
 **/
module.exports = [
  {
    test: /\.[t|j]s(x?)$/,
    exclude: /node_modules/,
    // loader: 'swc-loader',
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      }
    }
  },
];
