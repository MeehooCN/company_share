/**
 * @description: 图片对比
 * @author: cnn
 * @createTime: 2020/8/12 9:45
 **/
import React, { useState } from 'react';
import { Row } from 'antd';
import { API, CodeExample, TitleWithDescription, ImageCompare } from '@components/index';

const ImageCompareView = () => {
  const [comparisonView, setComparisonView] = useState<boolean>(false);
  const image = {
    name: 'misaka',
    originUrl: '',
    retouchUrl: '',
    height: 0,
    width: 0,
    thumbnailUrl: ''
  };
  const code = '';
  const paramList = [{
    name: 'retouchUrl',
    description: '修后图。',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'initUrl',
    description: '原图。',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'comparisonView',
    description: '是否显示对比图。',
    type: 'boolean',
    defaultValue: 'false'
  }, {
    name: 'setComparisonView',
    description: '设置是否显示对比图。',
    type: '函数',
    defaultValue: ''
  }, {
    name: 'openTimes',
    description: '开启次数',
    type: 'number',
    defaultValue: '0'
  }];
  const setComparisonViews = () => {
    setComparisonView(false);
  };
  const clickImage = () => {
    setComparisonView(true);
  };
  const showImage = (
    <div style={{ height: image.height || 150, width: image.width || undefined, margin: 5, cursor: 'pointer' }} onClick={clickImage}>
      <img src={image.thumbnailUrl} alt={image.name} style={{ height: image.height || 150, width: 'auto' }} />
    </div>
  );
  return (
    <Row>
      <TitleWithDescription title="ImageCompare" content="图片对比。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={showImage} code={code} />
      <API dataList={paramList} />
      <ImageCompare retouchUrl="" initUrl="" comparisonView={comparisonView} setComparisonView={setComparisonViews} openTimes={0} />
    </Row>
  );
};
export default ImageCompareView;
