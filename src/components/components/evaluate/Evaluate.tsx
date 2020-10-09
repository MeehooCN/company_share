/**
 * @description: 评价
 * @author: hzq
 * @createTime: 2020/10/9 10:11
 **/
import React, { useState } from 'react';
import { Row, Button, Tag, Modal, Rate, Input, message } from 'antd';
const { TextArea } = Input;
interface IProps {
  visible: boolean,
  handleCancel: any,
  evaluateTagList: Array<any>,
  submit: any,
  defaultTagColor: string,
  checkedTagColor: string
}
interface EvaluateTagData {
  id: string,
  content: string,
  checked: boolean
}
const Evaluate = (props: IProps) => {
  const { visible, handleCancel, evaluateTagList, submit, defaultTagColor, checkedTagColor } = props;
  const [rateValue, setRateValue] = useState<number>(0);
  const [showEvaluateTag, setShowEvaluateTag] = useState<boolean>(false);
  const [evaluateContent, setEvaluateContent] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [tagList, setTagList] = useState<Array<EvaluateTagData>>(evaluateTagList);
  // 点击星星
  const rateChange = (value: number) => {
    setRateValue(value);
    if (value === 5) {
      setShowEvaluateTag(false);
      setTagList(evaluateTagList);
      setEvaluateContent('');
    } else {
      setShowEvaluateTag(true);
    }
  };
  // 选择评价标签
  const tagClick = (index: number) => {
    tagList[index].checked = ! tagList[index].checked;
    setTagList([...tagList]);
  };
  // 输入评价内容
  const evaluateContentChange = (e: any) => {
    setEvaluateContent(e.target.value);
  };
  // 提交
  const handleSubmit = () => {
    setButtonLoading(true);
    const checkedList = tagList.filter((item: any) => item.checked === true);
    const value = {
      rateValue: rateValue,
      checkedList: checkedList,
      evaluateContent: evaluateContent
    };
    if (rateValue !== 5) {
      if (checkedList.length !== 0 || evaluateContent) {
        clearContent();
        submit(value);
      } else {
        message.error('请选择理由或输入理由！');
      }
    } else {
      clearContent();
      submit(value);
    }
    setButtonLoading(false);
  };
  const onCancel = () => {
    handleCancel();
    clearContent();
  };
  // 清空评价内容
  const clearContent = () => {
    setTagList(evaluateTagList);
    setRateValue(0);
    setShowEvaluateTag(false);
    setEvaluateContent('');
  };
  return (
    <Modal
      title="评价"
      visible={visible}
      footer={null}
      onCancel={onCancel}
      maskClosable={false}
      forceRender
    >
      <Row justify="center" style={{ marginBottom: 10 }}>
        <Rate allowHalf onChange={rateChange} value={rateValue} />
      </Row>
      <Row style={{ display: showEvaluateTag ? 'block' : 'none' }}>
        <Row justify="center" style={{ color: '#d8bd14', marginBottom: 10 }}>比较满意，仍可改善</Row>
        <Row justify="start" style={{ marginBottom: 15, maxHeight: 200, overflow: 'auto' }}>
          {
            tagList.map((item: any, index: number) => <Tag
              color={item.checked ? checkedTagColor : defaultTagColor}
              key={index}
              onClick={() => tagClick(index)}
              style={{ marginBottom: 10, padding: '5px', minWidth: '48%', textAlign: 'center' }}
            >{item.content}
            </Tag>)
          }
        </Row>
        <Row style={{ marginBottom: 20 }} justify="center">
          <TextArea rows={3} onChange={evaluateContentChange} value={evaluateContent} placeholder="请输入评价..." />
        </Row>
      </Row>
      <Row justify="center">
        <Button type="primary" loading={buttonLoading} onClick={handleSubmit} style={{ width: '50%', height: 40 }}>提交</Button>
      </Row>
    </Modal>
  );
};
export default Evaluate;