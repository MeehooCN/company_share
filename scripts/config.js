/**
 * @description: 服务器配置文件
 * @author: cnn
 * @createTime: 2021/2/8 10:30
 **/
/**
 * @host 服务器ip地址 '127.0.0.1'
 * @user 服务器用户名 'root'
 * @password 服务器密码 '123456'
 * @path 打包上传地址 '/opt/view/dist.zip'
 * @shPath 脚本目录 '/opt/sh'
 * @platform 服务器部署前缀路径 ''
 * @serverPath 请求前缀，nginx 需相应配置
 **/
module.exports = {
  hostType: 'linux',
  host: '47.114.87.97',
  user: 'root',
  password: '',
  path: '/opt/view/dist.zip',
  shPath: '/opt/sh',
  // 开发时
  // platform: '/',
  // 打包时
  platform: '/share/',
  serverPath: '/api/'
};
