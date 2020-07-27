/**
 * @description: 示例
 * @author: cnn
 * @createTime: 2020/7/21 10:56
 **/
import React from 'react';
import { Card, Row } from 'antd';
import { CodeBox } from '@components/index';
import './index.less';

interface IProps {
  viewComponents: React.ReactNode,
  code: string
}

const CodeExample = (props: IProps) => {
  const { viewComponents, code } = props;
  return (
    <Card style={{ width: '100%', minWidth: 1100 }}>
      {viewComponents}
      <Row style={{ marginTop: 20, width: '100%' }}>
        <CodeBox code={code} />
      </Row>
    </Card>
  );
};
export default CodeExample;
