/**
 * @description: 图片列表
 * @author: cnn
 * @createTime: 2020/7/22 16:43
 **/
import React from 'react';
import { Row } from 'antd';
import Mock, { Random } from 'mockjs';
import { API, CodeExample, ImageList, TitleWithDescription } from '@components/index';

const ImageListView = () => {
  // 初始化图片列表
  const initImageList = () => {
    return Mock.mock({
      'imageList|10-15': [{
        'id|+1': 1,
        'sourceUrl': Random.dataImage('300x250'),
        'thumbnailUrl|+1': [
          Random.dataImage('300x250'),
          Random.dataImage('450x300'),
          Random.dataImage('300x500'),
          Random.dataImage('300x600'),
          Random.dataImage('400x400'),
          Random.dataImage('400x400'),
        ],
        'thumbnailTrueUrl|+1': '',
        'name': Random.cname(),
        'width|+1': [300, 450, 300, 300, 400, 400],
        'height|+1': [250, 300, 500, 600, 400, 400]
      }]
    }).imageList;
  };
  const paramList = [{
    name: 'imageList',
    description: '图片列表',
    type: 'Array<ImageData>',
    defaultValue: '[]'
  }, {
    name: 'listChange',
    description: '可选，是否改变图片列表',
    type: 'bool',
    defaultValue: ''
  }, {
    name: 'containerWidth',
    description: '可选，容器宽度',
    type: 'number',
    defaultValue: '1200'
  }];
  const imageParamList = [{
    name: 'id',
    description: '图片id',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'sourceUrl',
    description: '图片原图地址',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'thumbnailUrl',
    description: '图片缩略图地址',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'thumbnailTrueUrl',
    description: '图片缩略图地址（懒加载使用）',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'name',
    description: '图片名称',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'width',
    description: '图片宽度',
    type: 'number',
    defaultValue: '无'
  }, {
    name: 'height',
    description: '图片高度',
    type: 'number',
    defaultValue: '无'
  }];
  const viewComponents = <ImageList imagePropList={initImageList()} listChange={false} containerWidth={1000} />;
  const code: string = '<ImageList imageList={[]} changeList={false} containerWidth={1000} />';
  return (
    <Row>
      <TitleWithDescription title="ImageList" content="图片列表。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={paramList} />
      <API title="ImageData" description="图片列表每张图片具体参数。" dataList={imageParamList} />
    </Row>
  );
};
export default ImageListView;
