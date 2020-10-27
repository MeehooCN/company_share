/**
 * @description: IOS 无法固定屏幕方向
 * @author: cnn
 * @createTime: 2020/10/27 14:07
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription } from '@components/index';

const IOSNoFix = () => {
  return (
    <div>
      <TitleWithDescription title="IOS 无法固定屏幕方向" content="使用 SystemChrome.setPreferredOrientations 在 IOS 中失效。" />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">1. 用 Xcode 打开当前项目。</Row>
        <Row className="description">2. Runner - General - Deployment Info - Status Bar Style 中勾上 Requires full screen。</Row>
      </Row>
    </div>
  );
};
export default IOSNoFix;
