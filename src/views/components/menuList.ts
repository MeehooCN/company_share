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
  }, {
    name: 'OverText 溢出文字',
    key: 'overText'
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
  }, {
    name: 'ImageCompare 图片对比',
    key: 'imageCompare'
  }, {
    name: 'ImageListHorizontal 横向图片列表',
    key: 'imageListHorizontal'
  }, {
    name: 'ImageListWithView 图片列表，点击看大图',
    key: 'imageListWithView'
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
  }, {
    name: '表单常用验证',
    key: 'formValid',
    children: []
  }]
}, {
  name: '反馈',
  key: 'feedback',
  children: [{
    name: 'Loading 居中显示加载效果',
    key: 'loading'
  }, {
    name: '离开页面提示',
    key: 'prompt'
  }]
}, {
  name: '其他',
  key: 'other',
  children: [{
    name: 'Evaluate 评价',
    key: 'evaluate'
  }, {
    name: 'MyRangePickerView 时间范围选择器',
    key: 'rangePicker'
  }, {
    name: 'SearchInput 带搜索下拉框',
    key: 'searchInput'
  }, {
    name: 'MoveWindow 可移动伸缩窗口',
    key: 'moveWindow'
  }]
}, {
  name: '图标',
  key: 'icon',
  children: [{
    name: 'IconFontChoose 选择图标',
    key: 'iconFontChoose'
  }]
}, {
  name: '登录',
  key: 'login',
  children: [{
    name: 'CodeLogin 手机验证码登录',
    key: 'codeLogin'
  }, {
    name: 'ImageLogin 图片验证码登录',
    key: 'imageLogin'
  }]
}, {
  name: '附件',
  key: 'attachment',
  children: [{
    name: 'AttachmentView 附件浏览',
    key: 'attachmentView'
  }]
}];
