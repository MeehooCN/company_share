/**
 * @description: 在父组件中通过this.props.children用子组件
 * @author: lcl
 * @createTime: 2020/7/31 17:14
 **/
import React from 'react';
import { Row } from 'antd';
import { CodeBox, TitleWithDescription } from '@components/index';

const ParentComponents = () => {
  const code1: string = 'import React from \'react\';\n' +
    'import { Button } from \'antd\';\n' +
    'import Parent from \'../../common/Parent\'; //引入Parent组件\n' +
    '\n' +
    'class AnyOne extends React.Component {\n' +
    '    return (\n' +
    '        <Parent>\n' +
    '            <Button type="primary">点击按钮</Button> // 在此处<Button>是<Parent>的子组件\n' +
    '        </Parent>\n' +
    '    )\n' +
    '}';
  const code2: string = 'import React from \'react\';\n' +
    '\n' +
    'export default class Parent extends React.Component {\n' +
    '    return (\n' +
    '        <Row>{this.props.children}</Row>\n' +
    '    )\n' +
    '}';
  return (
    <div>
      <TitleWithDescription title="this.props.children" content="使用 this.props.children 可以实现在父组件中使用子组件" />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">在任一页面中，调用的父组件下面有一个子组件：</Row>
        <CodeBox code={code1} />
        <Row className="description">在父组件中使用 this.props.children 可以在该页面显示出 Button 按钮 :</Row>
        <CodeBox code={code2} />
      </Row>
    </div>
  );
};
export default ParentComponents;
