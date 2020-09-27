/**
 * @description: 文字超出长度显示省略号，移上去显示全部文字。
 * @author: cnn
 * @createTime: 2020/9/27 10:06
 **/
import React from 'react';
import { Row } from 'antd';
import { API, CodeExample, OverText, TitleWithDescription } from '@components/index';

const OverTextView = () => {
  const overTextParamList = [{
    name: 'content',
    description: '显示内容',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'overflowLength',
    description: '显示字符串长度',
    type: 'number',
    defaultValue: ''
  }];
  const viewComponents = <OverText content="御坂美琴是世界上最可爱的初中生！" overflowLength={10} />;
  const code: string = '<OverText content="御坂美琴是世界上最可爱的初中生！" overflowLength={10} />';
  return (
    <Row>
      <TitleWithDescription title="OverText" content="文字超出长度显示省略号，移上去显示全部文字。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={overTextParamList} />
    </Row>
  );
};
export default OverTextView;
