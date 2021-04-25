/**
 * @description: 图片拖拽兼容性问题
 * @author: cnn
 * @createTime: 2021/4/25 11:24
 **/
import React from 'react';
import { CodeBox, TitleWithDescription } from '@components/index';
import { Row } from 'antd';

const ImageDrag = () => {
  const code: string = '<div\n' +
    '  onDragEnter={(e: any) => e.preventDefault()}\n' +
    '  onDragOver={(e: any) => e.preventDefault()}\n' +
    '  >\n' +
    '  <img></img>\n' +
    '</div>';
  return (
    <div>
      <TitleWithDescription title="图片拖拽兼容性问题" content="图片拖拽在 QQ 浏览器，360 浏览器会触发下载问题修复。" />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">在可拖拽的图片的容器中添加事件，onDragEnter，onDragOver，取消其默认事件。</Row>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <CodeBox code={code} />
      </Row>
    </div>
  );
};
export default ImageDrag;
