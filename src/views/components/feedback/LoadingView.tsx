/**
 * @description: Loading 居中显示加载效果
 * @author: cnn
 * @createTime: 2020/8/19 10:46
 **/
import React from 'react';
import { Row } from 'antd';
import { API, CodeExample, TitleWithDescription, Loading } from '@components/index';

const LoadingView = () => {
  const code = '<Loading loading={true} />';
  const paramList = [{
    name: 'loading',
    description: '当前是否加载中。',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'height',
    description: '加载容器高度。',
    type: 'number',
    defaultValue: '100'
  }];
  return (
    <Row>
      <TitleWithDescription title="Loading" content="居中显示加载效果。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={<Loading loading={true} />} code={code} />
      <API dataList={paramList} />
    </Row>
  );
};
export default LoadingView;
