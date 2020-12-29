/**
 * @description: 设计规范菜单
 * @author: cy
 * @createTime: 2020/8/13 11:02
 **/
/* eslint no-unused-vars:0 */
import { MenuData } from '@utils/CommonInterface';

export const menuList: Array<MenuData> = [{
  name: '按钮',
  key: 'button',
  children: [{
    name: '按钮位置',
    key: 'buttonPosition',
    children: []
  }, {
    name: '按钮顺序',
    key: 'buttonType',
    children: []
  }]
}, {
  name: '表格中的操作',
  key: 'tableOption',
  children: []
}];
