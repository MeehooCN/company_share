/**
 * @description: useReducer + useContext 测试组件
 * @author: cnn
 * @createTime: 2020/11/11 10:44
 **/
import React, { useContext } from 'react';
import { Row, Button } from 'antd';
import { MyReduxContext } from '@views/tips/react/UseRedux';

const TestRedux = () => {
  const { myReduxState, myReduxDispatch } = useContext(MyReduxContext);
  // 修改 name 值
  const setName = () => {
    myReduxDispatch({
      type: 'setName',
      name: myReduxState.name === '小白' ? '小花' : '小白'
    });
  };
  return (
    <Row align="middle">
      <div style={{ marginRight: 20 }}>测试值：{myReduxState.name}</div>
      <Button onClick={setName}>修改 name 值</Button>
    </Row>
  );
};
export default TestRedux;
