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
    key: 'basicProject'
  }, {
    name: 'WebStorm 开启 ESLint 校验',
    key: 'eslint'
  }]
}, {
  name: 'React 技巧',
  key: 'react',
  children: [{
    name: 'createPortal 传送门',
    key: 'createPortal'
  }, {
    name: 'ReactFragments 子组件返回组件列表',
    key: 'reactFragments'
  }, {
    name: 'ErrorBoundaries 错误边界',
    key: 'errorBoundaries'
  }, {
    name: 'this.props.children 在父组件中显示子组件',
    key: 'parentComponents'
  }, {
    name: 'useEffect 使用总结',
    key: 'useEffect'
  }]
}, {
  name: 'Node.js 技巧',
  key: 'node',
  children: [{
    name: 'yalc 将源代码打包用在自己项目中',
    key: 'yalc'
  }]
}];
