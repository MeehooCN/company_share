/**
 * @description: 图片对比
 * @author: cnn
 * @createTime: 2020/8/12 9:45
 **/
import React, { useState } from 'react';
import { Row } from 'antd';
import { API, CodeExample, TitleWithDescription, ImageCompare } from '@components/index';
// @ts-ignore
import origin from '@static/images/misaka-origin.jpg';
// @ts-ignore
import retouch from '@static/images/misaka-retouch.jpg';

const ImageCompareView = () => {
  const [comparisonView, setComparisonView] = useState<boolean>(false);
  const [openTimes, setOpenTimes] = useState<number>(0);
  const image = {
    name: 'misaka',
    originUrl: origin,
    retouchUrl: retouch,
    height: 0,
    width: 0,
    thumbnailUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg'
  };
  const code = '<ImageCompare\n' +
    '  retouchUrl={image.retouchUrl}\n' +
    '  initUrl={image.originUrl}\n' +
    '  comparisonView={comparisonView}\n' +
    '  setComparisonView={setComparisonViews}\n' +
    '  openTimes={openTimes}\n' +
    '/>';
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
    // 隐藏滚动条
    document.documentElement.style.overflow = 'hidden';
    setComparisonView(true);
    setOpenTimes(openTimes + 1);
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
      <ImageCompare
        retouchUrl={image.retouchUrl}
        initUrl={image.originUrl}
        comparisonView={comparisonView}
        setComparisonView={setComparisonViews}
        openTimes={openTimes}
      />
    </Row>
  );
};
export default ImageCompareView;
