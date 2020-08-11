/**
 * @description: 一行多列或多列表单-React Hook版
 * @author: cy
 * @createTime: 2020/7/31 16:39
 **/
import React, { useState } from 'react';
import { message, Row } from 'antd';
import { CodeExample, TitleWithDescription } from '@components/index';
import { CommonHorizForm, IFormColumns } from '@components/components/form/CommonHorizForm';
import API from '@components/components/API';
import {
  spanList,
  selectOption,
  treeData,
  residences,
  iFormColumnsAPIList,
  apiList
} from '@views/components/form/FormCommonVar';
import FormUseFunHook from '@views/components/form/FormUseFunHook';

const FormDemoHook = () => {
  const [inlineSpan, setInlineSpan] = useState(8);
  const [submitLoading, setSubmitLoading] = useState(false);
  const spanChange = (e: any) => {
    setInlineSpan(e.target.value);
  };
  const handleOK = (content: any) => {
    setSubmitLoading(true);
    console.log(content);
    message.success('提交表单');
    setTimeout(() => {
      setSubmitLoading(false);
    }, 1000);

  };
  const handleCancel = () => {
    message.info('取消表单填写');
  };
  const formColumns: Array<IFormColumns> = [
    { label: '每列的span', type: 'radio', name: 'connect', rules: [{ required: false }], option: spanList, onChange: spanChange, initialValue: '8' },
    { label: '文本', type: 'text', name: 'text', rules: [{ required: false }] },
    { label: '文本域', type: 'textArea', name: 'textArea', rules: [{ required: false }] },
    { label: '数字', type: 'inputNumber', name: 'inputNumber', rules: [{ required: false }] },
    { label: '密码', type: 'password', name: 'password', rules: [{ required: false }] },
    { label: '下拉选择', type: 'select', name: 'select', rules: [{ required: false }], option: selectOption },
    { label: '下拉选择(multiple)', type: 'select', name: 'selectMultiple', mode: 'multiple', rules: [{ required: false }], option: selectOption },
    { label: '树选择', type: 'treeSelect', name: 'treeSelect', rules: [{ required: false }], option: treeData },
    { label: '树选择(multiple)', type: 'treeSelect', name: 'treeSelectMultiple', multiple: true, rules: [{ required: false }], option: treeData },
    { label: '年月日(showTime)', type: 'date', name: 'date', rules: [{ required: false }] },
    { label: '年月日', type: 'dateNoTime', name: 'dateNoTime', rules: [{ required: false }] },
    { label: '时间范围', type: 'rangeDate', name: 'rangeDate', rules: [{ required: false }] },
    { label: '联级选择', type: 'cascader', name: 'cascader', rules: [{ required: false }], option: residences },
    { label: '单选框', type: 'radio', name: 'connect', rules: [{ required: false }], option: [{ key: '0', value: '否' }, { key: '1', value: '是' }] },
    { label: '隐藏', type: 'hidden', name: 'hidden', rules: [{ required: false }] },
  ];
  const viewComponents = <CommonHorizForm submitLoading={submitLoading} formColumns={formColumns} footerBtn={true} inlineSpan={inlineSpan} OK={handleOK} cancel={handleCancel} />;
  const code = 'const FormDemoHook = () => {\n' +
    ' const [inlineSpan, setInlineSpan] = useState(8);\n' +
    ' const [submitLoading, setSubmitLoading] = useState(false);\n' +
    ' // radio的change实践\n' +
    ' const spanChange = (e: any) => {\n' +
    '  setInlineSpan(e.target.value);\n' +
    ' }\n' +
    ' // 点击确定\n' +
    ' const handleOK = (content: any) => {\n' +
    '  setSubmitLoading(true)\n' +
    '  console.log(content)\n' +
    '  message.success(\'提交表单\')\n' +
    '  setTimeout(() => {\n' +
    '   setSubmitLoading(false)\n' +
    '  }, 1000)\n' +
    ' }\n' +
    ' // 点击取消\n' +
    ' const handleCancel = () => {\n' +
    '  message.info(\'取消表单填写\')\n' +
    ' }\n' +
    ' // option的值在组件外部，是下拉框 树选择 联级选择的数据源\n' +
    ' const formColumns: Array<IFormColumns> = [\n' +
    '  { label: \'每列的span\', type: \'radio\', name: \'connect\', rules: [{ required: false }], option: spanList, onChange: spanChange, initialValue: \'8\' },\n' +
    '  { label: \'文本\', type: \'text\', name: \'text\', rules: [{ required: false }] },\n' +
    '  { label: \'文本域\', type: \'textArea\', name: \'textArea\', rules: [{ required: false }] },\n' +
    '  { label: \'数字\', type: \'inputNumber\', name: \'inputNumber\', rules: [{ required: false }] },\n' +
    '  { label: \'密码\', type: \'password\', name: \'password\', rules: [{ required: false }] },\n' +
    '  { label: \'下拉选择\', type: \'select\', name: \'select\', rules: [{ required: false }], option: selectOption },\n' +
    '  { label: \'下拉选择(multiple)\', type: \'select\', name: \'selectMultiple\', mode: "multiple", rules: [{ required: false }], option: selectOption },\n' +
    '  { label: \'树选择\', type: \'treeSelect\', name: \'treeSelect\', rules: [{ required: false }], option: treeData },\n' +
    '  { label: \'树选择(multiple)\', type: \'treeSelect\', name: \'treeSelectMultiple\', multiple: true, rules: [{ required: false }], option: treeData },\n' +
    '  { label: \'年月日(showTime)\', type: \'date\', name: \'date\', rules: [{ required: false }] },\n' +
    '  { label: \'年月日\', type: \'dateNoTime\', name: \'dateNoTime\', rules: [{ required: false }] },\n' +
    '  { label: \'时间范围\', type: \'rangeDate\', name: \'rangeDate\', rules: [{ required: false }] },\n' +
    '  { label: \'联级选择\', type: \'cascader\', name: \'cascader\', rules: [{ required: false }], option: residences },\n' +
    '  { label: \'单选框\', type: \'radio\', name: \'connect\', rules: [{ required: false }], option: [{ key: \'0\', value: \'否\' }, { key: \'1\', value: \'是\' }] },\n' +
    '  { label: \'隐藏\', type: \'hidden\', name: \'hidden\', rules: [{ required: false }] },\n' +
    ' ]\n' +
    ' return <CommonHorizForm submitLoading={submitLoading} formColumns={formColumns} footerBtn={true} inlineSpan={inlineSpan} OK={handleOK} cancel={handleCancel} />\n' +
    '}';
  const funComponent = <FormUseFunHook />;
  const funCode = 'const FormUseFunHook = () => {\n' +
    ' const comFormRef: any = useRef();\n' +
    ' const setValue = () => {\n' +
    '  let value = {\n' +
    '   text: \'xixi\',\n' +
    '   select: \'jack\',\n' +
    '   inputNumber: 10\n' +
    '  }\n' +
    '  comFormRef.current.formRef.current.setFieldsValue(value);\n' +
    ' }\n' +
    ' const clearValue = () => {\n' +
    '  comFormRef.current.formRef.current.resetFields();\n' +
    ' }\n' +
    ' const formColumns: Array<IFormColumns> = [\n' +
    '  { label: \'文本\', type: \'text\', name: \'text\', rules: [{ required: true }] },\n' +
    '  { label: \'下拉选择\', type: \'select\', name: \'select\', rules: [{ required: true }], option: selectOption },\n' +
    '  { label: \'数字\', type: \'inputNumber\', name: \'inputNumber\', rules: [{ required: true }] }\n' +
    ' ]\n' +
    ' return <div>\n' +
    '  <Row justify="end" style={{ marginBottom: 10 }}>\n' +
    '   <Button type="primary" onClick={setValue} style={{ marginRight: 10 }}>赋值</Button>\n' +
    '   <Button type="primary" onClick={clearValue}>清空</Button>\n' +
    '  </Row>\n' +
    '  <CommonHorizForm ref={comFormRef} formColumns={formColumns} inlineSpan={8} />\n' +
    ' </div>\n' +
    '}';
  return <Row>
    <TitleWithDescription title="CommonHorizForm-class 版" content="class 写的公共的基础表单，有 class 组件版和 React Hook 版。" />
    <TitleWithDescription title="Hook 组件中使用表单示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
    <CodeExample viewComponents={viewComponents} code={code} />
    <TitleWithDescription title="Hook 组件中使用表单方法，表单赋值等" titleSize={24} content="使用 useRef 创建一个 ref 对象返回子组件，class 中使用 React.createRef() 创建 ref 对象" style={{ marginTop: 50, marginBottom: 10 }} />
    <CodeExample viewComponents={funComponent} code={funCode} />

    <API title="CommonHorizForm" dataList={apiList} />
    <API title="IFormColumns" description="表单项" dataList={iFormColumnsAPIList} />
  </Row>;
};
export default FormDemoHook;
