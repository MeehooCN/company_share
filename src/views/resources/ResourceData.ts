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
  }]
}, {
  type: '流程图',
  introduceComponentList: [{
    name: 'react-flow-chart',
    link: 'https://github.com/MrBlenny/react-flow-chart'
  }]
}, {
  type: '图片裁切',
  introduceComponentList: [{
    name: 'react-image-crop',
    link: 'https://github.com/DominicTobias/react-image-crop'
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
}];
