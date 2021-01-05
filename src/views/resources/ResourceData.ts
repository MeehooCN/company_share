/**
 * @description: 资源数据文件
 * @author: cnn
 * @createTime: 2020/7/22 15:55
 **/
/* eslint no-unused-vars:0 */
import { Resource } from '@utils/CommonInterface';

/**
 * react 资源数据文件
 * **/
export const reactResourceList: Array<Resource> = [{
  type: '网络请求',
  introduceComponentList: [{
    name: 'axios',
    link: 'https://github.com/axios/axios'
  }]
}, {
  type: '图表',
  introduceComponentList: [{
    name: 'echarts',
    link: 'https://echarts.apache.org/examples/zh/index.html'
  }, {
    name: 'antv',
    link: 'https://g2plot.antv.vision/zh'
  }, {
    name: 'datav-react',
    link: 'http://datav-react.jiaminghi.com/guide/borderBox.html',
    description: '大屏 UI 组件'
  }]
}, {
  type: '代码检查',
  introduceComponentList: [{
    name: 'eslint',
    link: 'https://github.com/eslint/eslint'
  }]
}, {
  type: 'canvas',
  introduceComponentList: [{
    name: 'fabric',
    link: 'https://github.com/fabricjs/fabric.js'
  }]
}, {
  type: '流程图',
  introduceComponentList: [{
    name: 'react-flow-chart',
    link: 'https://github.com/MrBlenny/react-flow-chart'
  }, {
    name: 'gg-editor',
    link: 'https://ggeditor.com/zh-CN'
  }]
}, {
  type: '图片裁切',
  introduceComponentList: [{
    name: 'react-image-crop',
    link: 'https://github.com/DominicTobias/react-image-crop'
  }]
}, {
  type: '大图加载',
  introduceComponentList: [{
    name: 'openseadragon',
    link: 'https://github.com/openseadragon/openseadragon'
  }]
}, {
  type: '拖拽',
  introduceComponentList: [{
    name: 'react-beautiful-dnd',
    link: 'https://github.com/atlassian/react-beautiful-dnd/'
  }]
}, {
  type: '代码高亮',
  introduceComponentList: [{
    name: 'react-syntax-highlighter',
    link: 'https://github.com/conorhastings/react-syntax-highlighter'
  }]
}, {
  type: '动画',
  introduceComponentList: [{
    name: 'react-transition-group',
    link: 'https://github.com/reactjs/react-transition-group'
  }, {
    name: 'Ant Motion',
    link: 'https://motion.ant.design/language/basic-cn'
  }]
}, {
  type: '包管理',
  introduceComponentList: [{
    name: 'yalc',
    link: 'https://github.com/whitecolor/yalc'
  }, {
    name: 'tsdx',
    link: 'https://github.com/formium/tsdx',
    description: '项目初始化、开发以及打包大管家'
  }, {
    name: 'np',
    link: 'https://github.com/sindresorhus/np',
    description: '一键发布 npm 包'
  }]
}, {
  type: '文件解析',
  introduceComponentList: [{
    name: 'xlsx',
    link: 'https://github.com/SheetJS/sheetjs',
    description: '解析 Excel 表格'
  }]
}];
/**
 * flutter 资源数据文件
 * **/
export const flutterResourceList: Array<Resource> = [{
  type: '常用工具类库',
  introduceComponentList: [{
    name: 'common_utils（Dart）',
    link: 'https://pub.dev/packages/common_utils'
  }, {
    name: 'flustars（Flutter）',
    link: 'https://pub.dev/packages/flustars'
  }]
}, {
  type: '本地存储',
  introduceComponentList: [{
    name: 'shared_preferences',
    link: 'https://pub.dev/packages/shared_preferences'
  }]
}, {
  type: '全局提示',
  introduceComponentList: [{
    name: 'oktoast',
    link: 'https://pub.dev/packages/oktoast'
  }]
}, {
  type: '网络请求',
  introduceComponentList: [{
    name: 'dio',
    link: 'https://pub.dev/packages/dio'
  }]
}, {
  type: '相机',
  introduceComponentList: [{
    name: 'camera',
    link: 'https://github.com/flutter/plugins/tree/master/packages/camera'
  }]
}, {
  type: '图片显示',
  introduceComponentList: [{
    name: 'cached_network_image',
    link: 'https://pub.dev/packages/cached_network_image'
  }, {
    name: 'photo_view',
    link: 'https://pub.dev/packages/photo_view'
  }]
}, {
  type: '音频播放',
  introduceComponentList: [{
    name: 'audioplayers',
    link: 'https://pub.dev/packages/audioplayers'
  }]
}, {
  type: '打包工具',
  introduceComponentList: [{
    name: 'flutter_launcher_icons',
    link: 'https://pub.dev/packages/flutter_launcher_icons'
  }]
}];
