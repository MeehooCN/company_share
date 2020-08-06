/**
 * @description: WebStorm 开启 ESLint 校验
 * @author: cnn
 * @createTime: 2020/8/6 13:39
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription } from '@components/index';
import './../index.less';

const WebStormESLint = () => {
  return (
    <div>
      <TitleWithDescription title="WebStorm ESLint 配置方法" content="" />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">
          1. File - Settings - Plugins 搜索 Eslint，安装。（如果搜索不到，到<a href="https://plugins.jetbrains.com/webStorm" target="_blank">插件市场</a>下载后本地安装。）
        </Row>
        <Row className="description">2. 安装后重启 WebStorm。 File - Settings - ESLint Settings。进行配置。</Row>
      </Row>
    </div>
  );
};
export default WebStormESLint;
