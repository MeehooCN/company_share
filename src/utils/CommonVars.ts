/**
 * @description: 公共变量
 * @author: cnn
 * @createTime: 2020/7/16 16:53
 **/
interface Colors {
  // 主题色
  primaryColor: string,
  error: string
}

export const colors: Colors = {
  primaryColor: '#eb6383',
  error: '#f5222d'
};
/**
 * API 接口路径
 **/
export const { serverPath } = require('./../../scripts/config');
/**
 * 服务器部署前缀路径
 * **/
export const { platform } = require('./../../scripts/config');
/**
 * 文件后缀
 **/
export const fileAccept = {
  doc: ['.doc', '.docx'],
  pdf: ['.pdf'],
  excel: ['.xls', '.xlsx'],
  zip: ['.rar', '.zip'],
  img: ['.jpg', '.jpeg', '.png', '.bmp'],
  all: ['.doc', '.docx', '.pdf', '.xls', '.xlsx', '.rar', '.zip', '.jpg', '.jpeg', '.png', '.bmp']
};
