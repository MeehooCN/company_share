/**
 * @description: 示例
 * @author: cnn
 * @createTime: 2020/7/21 10:56
 **/
import React, { useState } from 'react';
import { Card, Row, Tooltip } from 'antd';
import { CodeBox } from '@components/index';
import { CodeOutlined } from '@ant-design/icons';
import './index.less';

interface IProps {
  viewComponents: React.ReactNode,
  code: string
}

const CodeExample = (props: IProps) => {
  const { viewComponents, code } = props;
  const [codeView, setCodeView] = useState<boolean>(false);
  return (
    <Card className="code-box" bodyStyle={{ padding: 0 }}>
      <Row style={{ padding: 20 }}>
        {viewComponents}
      </Row>
      <Row justify="center" className="action-sheet" style={{ borderBottom: codeView ? '1px dashed #ddd' : 0 }}>
        <Tooltip title={codeView ? '收起代码' : '显示代码'}>
          <CodeOutlined className="action-icon" onClick={() => setCodeView(!codeView)} />
        </Tooltip>
      </Row>
      <Row style={{ display: codeView ? 'block' : 'none' }}>
        <CodeBox code={code} />
      </Row>
    </Card>
  );
};
export default CodeExample;
