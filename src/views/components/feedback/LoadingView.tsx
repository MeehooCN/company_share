/**
 * @description: Loading 居中显示加载效果
 * @author: cnn
 * @createTime: 2020/8/19 10:46
 **/
import React, { useState } from 'react';
import { Row, Button } from 'antd';
import { API, CodeExample, TitleWithDescription, Loading } from '@components/index';

const LoadingView = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const code = '<Loading loading={true} />';
  const paramList = [{
    name: 'loading',
    description: '当前是否加载中。',
    type: 'boolean',
    defaultValue: 'false'
  }, {
    name: 'height',
    description: '加载容器高度。',
    type: 'number',
    defaultValue: '100'
  }];
  const getViewComponents = () => {
    return (
      <Row style={{ width: '100%' }}>
        <Button type="primary" onClick={() => setLoading(!loading)}>{loading ? '停止加载' : '开始加载'}</Button>
        <Loading loading={loading} />
      </Row>
    );
  };
  return (
    <Row>
      <TitleWithDescription title="Loading" content="居中显示加载效果。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={getViewComponents()} code={code} />
      <API dataList={paramList} />
    </Row>
  );
};
export default LoadingView;
