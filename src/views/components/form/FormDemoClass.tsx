/**
 * @description: 一行多列或多列表单-React Hook版
 * @author: cy
 * @createTime: 2020/7/31 16:39
 **/
import React from 'react';
import { message, Row } from 'antd';
import { CodeExample, TitleWithDescription } from '@components/index';
import { CommonHorizForm, IFormColumns } from '@components/components/form/CommonHorizForm';
import {
  spanList,
  selectOption,
  treeData,
  residences,
} from '@views/components/form/FormCommonVar';
interface IState {
  inlineSpan: any,
  submitLoading: boolean
}
class FormDemoClass extends React.Component<any, IState> {
  public readonly state: Readonly<IState> = {
    inlineSpan: 8,
    submitLoading: false
  }
  spanChange = (e: any) => {
    this.setState({ inlineSpan: e.target.value });
  }
  handleOK = (content: any) => {
    this.setState({ submitLoading: true });
    console.log(content);
    message.success('提交表单');
    setTimeout(() => {
      this.setState({ submitLoading: false });
    }, 1000);

  }
  handleCancel = () => {
    message.info('取消表单填写');
  }
  render(): React.ReactNode {
    const { submitLoading, inlineSpan } = this.state;
    const formColumns: Array<IFormColumns> = [
      { label: '每列的span', type: 'radio', name: 'connect', rules: [{ required: false }], option: spanList, onChange: this.spanChange, initialValue: '8' },
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
    const viewComponents = <CommonHorizForm submitLoading={submitLoading} formColumns={formColumns} footerBtn={true} inlineSpan={inlineSpan} OK={this.handleOK} cancel={this.handleCancel} />;
    const code = 'interface IState {\n' +
      ' inlineSpan: any,\n' +
      ' submitLoading: boolean\n' +
      '}\n' +
      'class FormDemoClass extends React.Component<any, IState> {\n' +
      ' public readonly state: Readonly<IState> = {\n' +
      '  inlineSpan: 8,\n' +
      '  submitLoading: false\n' +
      ' }\n' +
      ' spanChange = (e: any) => {\n' +
      '  this.setState({ inlineSpan: e.target.value })\n' +
      ' }\n' +
      ' handleOK = (content: any) => {\n' +
      '  this.setState({ submitLoading: true })\n' +
      '  console.log(content)\n' +
      '  message.success(\'提交表单\')\n' +
      '  setTimeout(() => {\n' +
      '   this.setState({ submitLoading: false })\n' +
      '  }, 1000)\n' +
      '\n' +
      ' }\n' +
      ' handleCancel = () => {\n' +
      '  message.info(\'取消表单填写\')\n' +
      ' }\n' +
      ' render(): React.ReactNode {\n' +
      '  const { submitLoading, inlineSpan } = this.state;\n' +
      '  const formColumns: Array<IFormColumns> = [\n' +
      '   { label: \'每列的span\', type: \'radio\', name: \'connect\', rules: [{ required: false }], option: spanList, onChange: this.spanChange, initialValue: \'8\' },\n' +
      '   { label: \'文本\', type: \'text\', name: \'text\', rules: [{ required: false }] },\n' +
      '   { label: \'文本域\', type: \'textArea\', name: \'textArea\', rules: [{ required: false }] },\n' +
      '   { label: \'数字\', type: \'inputNumber\', name: \'inputNumber\', rules: [{ required: false }] },\n' +
      '   { label: \'密码\', type: \'password\', name: \'password\', rules: [{ required: false }] },\n' +
      '   { label: \'下拉选择\', type: \'select\', name: \'select\', rules: [{ required: false }], option: selectOption },\n' +
      '   { label: \'下拉选择(multiple)\', type: \'select\', name: \'selectMultiple\', mode: "multiple", rules: [{ required: false }], option: selectOption },\n' +
      '   { label: \'树选择\', type: \'treeSelect\', name: \'treeSelect\', rules: [{ required: false }], option: treeData },\n' +
      '   { label: \'树选择(multiple)\', type: \'treeSelect\', name: \'treeSelectMultiple\', multiple: true, rules: [{ required: false }], option: treeData },\n' +
      '   { label: \'年月日(showTime)\', type: \'date\', name: \'date\', rules: [{ required: false }] },\n' +
      '   { label: \'年月日\', type: \'dateNoTime\', name: \'dateNoTime\', rules: [{ required: false }] },\n' +
      '   { label: \'时间范围\', type: \'rangeDate\', name: \'rangeDate\', rules: [{ required: false }] },\n' +
      '   { label: \'联级选择\', type: \'cascader\', name: \'cascader\', rules: [{ required: false }], option: residences },\n' +
      '   { label: \'单选框\', type: \'radio\', name: \'connect\', rules: [{ required: false }], option: [{ key: \'0\', value: \'否\' }, { key: \'1\', value: \'是\' }] },\n' +
      '   { label: \'隐藏\', type: \'hidden\', name: \'hidden\', rules: [{ required: false }] },\n' +
      '  ]\n' +
      '  return <CommonHorizForm submitLoading={submitLoading} formColumns={formColumns} footerBtn={true} inlineSpan={inlineSpan} OK={this.handleOK} cancel={this.handleCancel} />\n' +
      ' }\n' +
      '}';

    return <Row>
      <TitleWithDescription title="CommonHorizForm-Class 版" content="公共的基础表单，有 class 组件版和 React Hook 版。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
    </Row>;
  }
}
export default FormDemoClass;
