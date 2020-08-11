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
    key: 'myTitle'
  }]
}, {
  name: '图片',
  key: 'image',
  children: [{
    name: 'ImageList 自适应图片列表',
    key: 'imageList'
  }, {
    name: 'ImageView 图片浏览',
    key: 'imageView'
  }]
}, {
  name: '表单',
  key: 'form',
  children: [{
    name: '搜索表单',
    key: 'searchForm',
    children: []
  }, {
    name: 'Hook 表单',
    key: 'hookForm',
    children: []
  }, {
    name: 'React Hook 使用 class 表单',
    key: 'commonForm',
    children: []
  }, {
    name: 'class 使用 class 表单',
    key: 'commonFormClass',
    children: []
  }]
}];
