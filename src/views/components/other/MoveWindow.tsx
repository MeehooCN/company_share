/**
 * @description: 可移动伸缩窗口
 * @author: lll
 * @createTime: 2021/8/12 10:30
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, API, CodeExample, MoveWindow as MoveWindowView } from '@components/index';

const MoveWindow = () => {
  const titleParamList = [{
    name: 'moveTitle',
    description: '窗口标题',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'minWidth',
    description: '窗口最小宽度',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'minHeight',
    description: '窗口最小高度',
    type: 'number',
    defaultValue: ''
  }];
  const viewComponents = <MoveWindowView moveTitle="可移动伸缩窗口" minWidth={500} minHeight={500} />;
  const code: string = '<MoveWindowView moveTitle="可移动伸缩窗口" minWidth={500} minHeight={500} />';
  return (
    <Row>
      <TitleWithDescription title="MoveWindow" content="可移动伸缩窗口（该窗口的显示不会影响底层操作，如填写表单、点击按钮等）" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={titleParamList} />
    </Row>
  );
};
export default MoveWindow;
