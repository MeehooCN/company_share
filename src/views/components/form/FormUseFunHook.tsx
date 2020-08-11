/**
 * @description: 使用公共表单的方法-Hook
 * @author: cy
 * @createTime: 2020/8/11 11:24
 **/
import React, { useRef } from 'react';
import { CommonHorizForm, IFormColumns } from '@components/components/form/CommonHorizForm';
import { selectOption } from '@views/components/form/FormCommonVar';
import { Row, Button } from 'antd';
const FormUseFunHook = () => {
  const comFormRef: any = useRef();
  const setValue = () => {
    let value = {
      text: 'xixi',
      select: 'jack',
      inputNumber: 10
    };
    comFormRef.current.formRef.current.setFieldsValue(value);
  };
  const clearValue = () => {
    comFormRef.current.formRef.current.resetFields();
  };
  const formColumns: Array<IFormColumns> = [
    { label: '文本', type: 'text', name: 'text', rules: [{ required: true }] },
    { label: '下拉选择', type: 'select', name: 'select', rules: [{ required: true }], option: selectOption },
    { label: '数字', type: 'inputNumber', name: 'inputNumber', rules: [{ required: true }] }
  ];
  return <div>
    <Row justify="end" style={{ marginBottom: 10 }}>
      <Button type="primary" onClick={setValue} style={{ marginRight: 10 }}>赋值</Button>
      <Button type="primary" onClick={clearValue}>清空</Button>
    </Row>
    <CommonHorizForm ref={comFormRef} formColumns={formColumns} inlineSpan={8} />
  </div>;
};
export default FormUseFunHook;
