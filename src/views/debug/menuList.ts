/**
 * @description: 错误菜单数据
 * @author: cnn
 * @createTime: 2020/7/22 9:28
 **/
/* eslint no-unused-vars:0 */
import { MenuData } from '@utils/CommonInterface';

export const menuList: Array<MenuData> = [{
  name: 'React 错误处理',
  key: 'react',
  children: [{
    name: 'ReactEcharts y 轴数据过小处理',
    key: 'echartsYError'
  }]
}, {
  name: 'Flutter 错误处理',
  key: 'flutter',
  children: [{
    name: 'flutter initializing gradle...',
    key: 'initialingGradle'
  }]
}];
