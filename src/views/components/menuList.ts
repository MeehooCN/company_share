/**
 * @description: 组件菜单数据
 * @author: cnn
 * @createTime: 2020/7/22 9:28
 **/
/* eslint no-unused-vars:0 */
import { MenuData } from '@utils/CommonInterface';

export const menuList: Array<MenuData> = [{
  name: '文字',
  key: 'text',
  children: [{
    name: 'MyTitle 标题',
    key: 'myTitle',
    children: []
  }]
}, {
  name: '图片',
  key: 'image',
  children: [{
    name: 'ImageList 自适应图片列表',
    key: 'imageList',
    children: []
  }, {
    name: 'ImageView 图片浏览',
    key: 'imageView',
    children: []
  }]
}];
