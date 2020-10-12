/**
 * @description: 评价
 * @author: hzq
 * @createTime: 2020/10/9 10:30
 **/
import React, { useState } from 'react';
import { Button, Row } from 'antd';
import { API, CodeExample, Evaluate, TitleWithDescription } from '@components/index';
const EvaluateView = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const evaluateTagList = [{ checked: false, content: '脸黑' }, { checked: false, content: '图片模糊' }];
  const handleSubmit = (data: any) => {
    console.log(data);
    setModalVisible(false);
  };
  const code: string = '      <Evaluate\n' +
    '          visible={modalVisible}\n' +
    '          evaluateTagList={evaluateTagList}\n' +
    '          defaultTagColor="pink"\n' +
    '          checkedTagColor="gold"\n' +
    '          submit={handleSubmit}\n' +
    '          handleCancel={() => setModalVisible(false)}\n' +
    '        />';
  const paramList = [{
    name: 'visible',
    description: '对话框是否可见',
    type: 'boolean',
    defaultValue: 'false'
  }, {
    name: 'evaluateTagList',
    description: '评价标签列表',
    type: 'Array<EvaluateTagData>',
    defaultValue: ''
  }, {
    name: 'defaultTagColor',
    description: '评价标签未选中的颜色',
    type: 'string',
    defaultValue: 'pink'
  }, {
    name: 'checkedTagColor',
    description: '评价标签选中时的颜色',
    type: 'string',
    defaultValue: 'gold'
  }, {
    name: 'handleCancel',
    description: '点击右上角叉的回调',
    type: '函数',
    defaultValue: ''
  }, {
    name: 'submit',
    description: '点击提交回调',
    type: '函数',
    defaultValue: ''
  }];
  const evaluateTagParamsList = [{
    name: 'id',
    description: '评价标签id',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'content',
    description: '评价标签内容',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'checked',
    description: '评价标签是否选中',
    type: 'boolean',
    defaultValue: 'false'
  }];
  const getViewComponents = () => {
    return (
      <Row style={{ width: '100%' }}>
        <Button type="primary" onClick={() => setModalVisible(true)}>评价</Button>
        <Evaluate
          visible={modalVisible}
          evaluateTagList={evaluateTagList}
          defaultTagColor="pink"
          checkedTagColor="gold"
          submit={handleSubmit}
          handleCancel={() => setModalVisible(false)}
        />
      </Row>
    );
  };
  return (
    <Row>
      <TitleWithDescription title="Evaluate" content="评价" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={getViewComponents()} code={code} />
      <API dataList={paramList} />
      <API title="EvaluateTagData" description="评价标签每个标签具体参数。" dataList={evaluateTagParamsList} />
    </Row>
  );
};
export default EvaluateView;