/**
 * @description: 虽然叫 useRedux 其实并不是 useRedux，其实是 useContext + useReducer 两者的结合。
 * @author: cnn
 * @createTime: 2020/11/11 9:46
 **/
import React, { createContext, useReducer } from 'react';
import { Row } from 'antd';
import { CodeBox, TitleWithDescription } from '@components/index';
import myReduxReducer, { myReduxInit } from '@views/tips/react/useReducer/myReduxReducer';
import TestRedux from '@views/tips/react/useReducer/TestRedux';
import { colors } from '@utils/CommonVars';
import './../index.less';

export const MyReduxContext = createContext({ myReduxState: myReduxInit, myReduxDispatch: (value: any) => {} });

const UseRedux = () => {
  const [myReduxState, myReduxDispatch] = useReducer(myReduxReducer, myReduxInit);
  const code1 = 'interface MyReduxInit {\n' +
    '  name: string\n' +
    '}\n' +
    '\n' +
    'export const myReduxInit: MyReduxInit = {\n' +
    '  name: \'小花\'\n' +
    '};\n' +
    '\n' +
    'const myReduxReducer = (state = myReduxInit, action: any) => {\n' +
    '  const map: Map<string, MyReduxInit> = new Map([\n' +
    '    [\'setName\', { ...state, name: action.name }]\n' +
    '  ]);\n' +
    '  return map.get(action.type) || myReduxInit;\n' +
    '};\n' +
    'export default myReduxReducer;';
  const code2 = '// 引入 reducer\n' +
    'import myReduxReducer, { myReduxInit } from \'@views/tips/react/useReducer/myReduxReducer\';\n' +
    '// 新建 context\n' +
    'export const MyReduxContext = createContext({ myReduxState: myReduxInit, myReduxDispatch: (value: any) => {} });\n' +
    '// 测试组件\n' +
    'import TestRedux from \'@views/tips/react/useReducer/TestRedux\';\n' +
    'const UseRedux = () => {\n' +
    '  const [myReduxState, myReduxDispatch] = useReducer(myReduxReducer, myReduxInit);\n' +
    '  return (\n' +
    '    // 赋值\n' +
    '    <MyReduxContext.Provider value={{ myReduxState, myReduxDispatch }}>\n' +
    '      <TestRedux />\n' +
    '    </MyReduxContext.Provider>\n' +
    '  );\n' +
    '};\n' +
    'export default UseRedux;';
  const code3 = 'import React, { useContext } from \'react\';\n' +
    'import { Row, Button } from \'antd\';\n' +
    'import { MyReduxContext } from \'@views/tips/react/UseRedux\';\n' +
    '\n' +
    'const TestRedux = () => {\n' +
    '  const { myReduxState, myReduxDispatch } = useContext(MyReduxContext);\n' +
    '  // 修改 name 值\n' +
    '  const setName = () => {\n' +
    '    myReduxDispatch({\n' +
    '      type: \'setName\',\n' +
    '      name: myReduxState.name === \'小白\' ? \'小花\' : \'小白\'\n' +
    '    });\n' +
    '  };\n' +
    '  return (\n' +
    '    <Row align="middle">\n' +
    '      <div style={{ marginRight: 20 }}>测试值：{myReduxState.name}</div>\n' +
    '      <Button onClick={setName}>修改 name 值</Button>\n' +
    '    </Row>\n' +
    '  );\n' +
    '};\n' +
    'export default TestRedux;';
  return (
    <MyReduxContext.Provider value={{ myReduxState, myReduxDispatch }}>
      <div>
        <TitleWithDescription
          title="useContext + useReducer 构建属于你的状态管理器。"
          content="useContext + useReducer 使用介绍。"
          url="https://react.docschina.org/docs/hooks-reference.html"
        />
        <Row style={{ marginTop: 20 }}>
          <div style={{ border: '1px solid ' + colors.primaryColor, width: '100%', padding: 20, borderRadius: 4, marginBottom: 20 }}>
            <Row className="description">最终效果：</Row>
            <TestRedux />
          </div>
          <Row className="description">1. 新建 reducer：</Row>
          <CodeBox code={code1} />
          <Row className="description">2. 引入 reducer，新建 context，把 reducer 返回值赋值给 context：</Row>
          <CodeBox code={code2} />
          <Row className="description">3. 使用：</Row>
          <CodeBox code={code3} />
        </Row>
      </div>
    </MyReduxContext.Provider>
  );
};
export default UseRedux;
