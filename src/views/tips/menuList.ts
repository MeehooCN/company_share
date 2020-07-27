/**
 * @description: Tips 技巧菜单数据
 * @author: cnn
 * @createTime: 2020/7/22 9:28
 **/
/* eslint no-unused-vars:0 */
import { MenuData } from '@utils/CommonInterface';

export const menuList: Array<MenuData> = [{
  name: '项目技巧',
  key: 'project',
  children: [{
    name: '基本业务系统的增删查改',
    key: 'basicProject',
    children: []
  }]
}, {
  name: 'React 技巧',
  key: 'react',
  children: [{
    name: 'createPortal 传送门',
    key: 'createPortal',
    children: []
  }, {
    name: 'ReactFragments 子组件返回组件列表',
    key: 'reactFragments',
    children: []
  }, {
    name: 'ErrorBoundaries 错误边界',
    key: 'errorBoundaries',
    children: []
  }]
}];
