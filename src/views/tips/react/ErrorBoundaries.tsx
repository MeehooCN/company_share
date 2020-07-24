/**
 * @description: react 错误边界（Error Boundaries）
 * @author: cnn
 * @createTime: 2020/7/22 15:01
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, CodeBox } from '@components/index';
import './../index.less';

const ErrorBoundaries = () => {
  const code1: string = '// ErrorBoundary.tsx\n' +
    'import React from \'react\';\n' +
    'import { Result } from \'antd\';\n' +
    '\n' +
    'interface IProps {}\n' +
    '\n' +
    'interface IState {\n' +
    '  hasError: boolean\n' +
    '}\n' +
    '\n' +
    'class ErrorBoundary extends React.Component<IProps, IState> {\n' +
    '  static getDerivedStateFromError(error: any) {\n' +
    '    // 更新 state 使下一次渲染能够显示降级后的 UI\n' +
    '    return { hasError: true };\n' +
    '  }\n' +
    '  public readonly state: Readonly<IState> = {\n' +
    '    hasError: false\n' +
    '  };\n' +
    '  componentDidCatch(error: any, errorInfo: any) {\n' +
    '    this.setState({ hasError: true });\n' +
    '  }\n' +
    '  render() {\n' +
    '    const { hasError } = this.state;\n' +
    '    if (hasError) {\n' +
    '      return (\n' +
    '        <Result status="warning" title="发生了点错误 QAQ" />\n' +
    '      );\n' +
    '    }\n' +
    '    return this.props.children;\n' +
    '  }\n' +
    '}\n' +
    'export default ErrorBoundary;';
  const code2: string = 'import React from \'react\';\n' +
    'import { BrowserRouter as Router, Switch, Route } from \'react-router-dom\';\n' +
    'import { Login, HomeApp, NotFound, ProcessList } from \'@views/index\';\n' +
    '// 捕获错误组件\n' +
    'import { ErrorBoundary } from \'@components/index\';\n' +
    'import { platform } from \'@utils/commonVar\';\n' +
    '\n' +
    'class App extends React.PureComponent {\n' +
    '  render() {\n' +
    '    return (\n' +
    '      <Router>\n' +
    '        <Switch>\n' +
    '          <Route exact path="/login" component={Login} />\n' +
    '          <HomeApp>\n' +
    '            <Switch>\n' +
    '              <ErrorBoundary>\n' +
    '                <Route exact path={platform + \'/processList\'} component={ProcessList} />\n' +
    '              </ErrorBoundary>\n' +
    '              <Route component={NotFound} />\n' +
    '            </Switch>\n' +
    '          </HomeApp>\n' +
    '          <Route component={NotFound} />\n' +
    '        </Switch>\n' +
    '      </Router>\n' +
    '    );\n' +
    '  }\n' +
    '}\n' +
    'export default App;';
  return (
    <div>
      <TitleWithDescription title="ErrorBoundaries" content="react 错误边界，捕获错误，可配置上传到服务器。" />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">公用组件，捕获错误的组件。</Row>
        <CodeBox code={code1} />
        <Row className="description-stand">注意错误边界仅可以捕获其子组件的错误。</Row>
        <Row className="description">此处用于 react-router 中捕获了路由所有的错误，其实细粒度可以更高一些。</Row>
        <CodeBox code={code2} />
      </Row>
    </div>
  );
};
export default ErrorBoundaries;
