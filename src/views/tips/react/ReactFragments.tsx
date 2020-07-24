/**
 * @description: 子组件返回组件列表
 * @author: cnn
 * @createTime: 2020/7/22 14:49
 **/

import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, CodeBox } from '@components/index';
import './../index.less';

const ReactFragments = () => {
  const code1: string = 'class Table extends React.Component {\n' +
    '  render() {\n' +
    '    return (\n' +
    '      <table>\n' +
    '        <tr>\n' +
    '          <Columns />\n' +
    '        </tr>\n' +
    '      </table>\n' +
    '    );\n' +
    '  }\n' +
    '}';
  const code2: string = 'class Columns extends React.Component {\n' +
    '  render() {\n' +
    '    return (\n' +
    '      <div>\n' +
    '        <td>Hello</td>\n' +
    '        <td>World</td>\n' +
    '      </div>\n' +
    '    );\n' +
    '  }\n' +
    '}';
  const code3: string = '<table>\n' +
    '  <tr>\n' +
    '    <div>\n' +
    '      <td>Hello</td>\n' +
    '      <td>World</td>\n' +
    '    </div>\n' +
    '  </tr>\n' +
    '</table>';
  const code4: string = 'class Columns extends React.Component {\n' +
    '  render() {\n' +
    '    return (\n' +
    '      <React.Fragment>\n' +
    '          <td>Hello</td>\n' +
    '          <td>World</td>\n' +
    '      </React.Fragment>\n' +
    '    );\n' +
    '  }\n' +
    '}';
  const code5: string = 'class Columns extends React.Component {\n' +
    '  render() {\n' +
    '    return (\n' +
    '      <>\n' +
    '          <td>Hello</td>\n' +
    '          <td>World</td>\n' +
    '      </>\n' +
    '    );\n' +
    '  }\n' +
    '}';
  return (
    <div>
      <TitleWithDescription title="ReactFragments" content="子组件返回组件列表。" />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">当你想生成一个table时：</Row>
        <CodeBox code={code1} />
        <Row className="description">{'<Columns /> 需要返回多个 <td> 元素以使渲染的 HTML 有效。如果在 <Columns /> 的 render() 中使用了父 div，则生成的 HTML 将无效。'}</Row>
        <CodeBox code={code2} />
        <Row className="description">{'得到一个 <Table /> 输出：'}</Row>
        <CodeBox code={code3} />
        <Row className="description">Fragments 解决了这个问题。</Row>
        <CodeBox code={code4} />
        <Row className="description">短语法</Row>
        <CodeBox code={code5} />
      </Row>
    </div>
  );
};
export default ReactFragments;
