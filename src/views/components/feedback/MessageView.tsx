/**
 * @description: 消息提示
 * @author: cnn
 * @createTime: 2021/12/15 16:25
 **/
import React from 'react';
import { Row, Button } from 'antd';
import { API, CodeExample, TitleWithDescription, message } from '@components/index';

const MessageView = () => {
  const paramList = [{
    name: 'msg',
    description: '提示文字。',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'type',
    description: '提示类型，成功，警告，报错。',
    type: '\'warning\' | \'error\' | \'success\'',
    defaultValue: 'success'
  }, {
    name: 'duration',
    description: '显示持续时间。',
    type: 'number',
    defaultValue: '3'
  }];
  const getViewComponents = () => {
    return (
      <Row style={{ width: '100%' }}>
        <Button type="primary" onClick={() => message('我是弹出的消息！', 'warning')}>弹出消息</Button>
      </Row>
    );
  };
  const code = 'message(\'我是弹出的消息！\', \'warning\')';
  return (
    <Row>
      <TitleWithDescription title="message" content="消息提示。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={getViewComponents()} code={code} />
      <API dataList={paramList} />
    </Row>
  );
};
export default MessageView;
