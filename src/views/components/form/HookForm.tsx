/**
 * @description: 一行多列或多列表单-React Hook版
 * @author: cy
 * @createTime: 2020/7/31 16:39
 **/
import React, { useState } from 'react';
import { Button, message, Modal, Row, Table } from 'antd';
import { CodeExample, TitleWithDescription } from '@components/index';
import { IFormColumns } from '@components/components/form/CommonHorizForm';
import API from '@components/components/API';
import { CommonHorizFormHook } from '@components/components/form/CommonHorizFormHook';
import { sexOption } from '@views/components/form/FormCommonVar';

const initList = [
  { id: '1', name: 'jack', sex: '男', age: 18 },
  { id: '2', name: 'rose', sex: '女', age: 16 },
  { id: '3', name: 'tom', sex: '男', age: 21 },
];
const apiList = [
  {
    name: 'formValue',
    description: '表单值',
    type: 'any',
    defaultValue: ''
  }
];
const HookForm = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [formValue, setFormValue] = useState();
  const [userList, setUserList] = useState<any[]>(initList);
  const handleOK = (content: any) => {
    setSubmitLoading(true);
    message.success('提交表单');
    const newList = userList.map(item => {
      if (item.id === content.id) {
        return content;
      }
      return item;
    });
    setUserList(newList);
    setTimeout(() => {
      setSubmitLoading(false);
      setUpdateView(false);
    }, 1000);
  };
  const handleCancel = () => {
    message.info('取消表单填写');
    setUpdateView(false);
    setFormValue(undefined);
  };
  const updateUser = (row: any) => {
    setUpdateView(true);
    setFormValue(row);
  };
  const formColumns: Array<IFormColumns> = [
    { label: '姓名', type: 'text', name: 'name', rules: [{ required: true }] },
    { label: '性别', type: 'inputNumber', name: 'age', rules: [{ required: true }] },
    { label: '年龄', type: 'radio', name: 'sex', rules: [{ required: true }], option: sexOption },
    { label: 'id', type: 'hidden', name: 'id', rules: [{ required: false }] },
  ];
  const columns = [
    { title: '序号', dataIndex: 'id' },
    { title: '姓名', dataIndex: 'name' },
    { title: '性别', dataIndex: 'sex' },
    { title: '年龄', dataIndex: 'age' },
    {
      title: '操作', dataIndex: 'opt', render: (text: any, row: any) => {
        return <div>
          <Button type="link" onClick={() => updateUser(row)}>编辑</Button>
        </div>;
      }
    }
  ];
  const viewComponents = <Row style={{ width: '100%' }}>
    <Table<any>
      dataSource={userList}
      columns={columns}
      rowKey={(r: any) => r.id}
      bordered={true}
      style={{ width: '100%' }}
    />
    <Modal visible={updateView} title="编辑用户" footer={null} maskClosable={false} onCancel={handleCancel}>
      <CommonHorizFormHook
        submitLoading={submitLoading}
        formColumns={formColumns}
        footerBtn={true}
        formValue={formValue}
        OK={handleOK}
        cancel={handleCancel}
      />
    </Modal>
  </Row>;
  const code = 'const initList = [\n' +
    ' { id: \'1\', name: \'jack\', sex: \'男\', age: 18 },\n' +
    ' { id: \'2\', name: \'rose\', sex: \'女\', age: 16 },\n' +
    ' { id: \'3\', name: \'tom\', sex: \'男\', age: 21 },\n' +
    ']\n' +
    'const HookForm = () => {\n' +
    ' const [submitLoading, setSubmitLoading] = useState(false);\n' +
    ' const [updateView, setUpdateView] = useState(false);\n' +
    ' const [formValue, setFormValue] = useState();\n' +
    ' const [userList, setUserList] = useState<any[]>(initList);\n' +
    ' const handleOK = (content: any) => {\n' +
    '  setSubmitLoading(true);\n' +
    '  message.success(\'提交表单\');\n' +
    '  const newList = userList.map(item => {\n' +
    '   if (item.id === content.id) {\n' +
    '    return content;\n' +
    '   }\n' +
    '   return item;\n' +
    '  })\n' +
    '  setUserList(newList);\n' +
    '  setTimeout(() => {\n' +
    '   setSubmitLoading(false)\n' +
    '   setUpdateView(false);\n' +
    '  }, 1000);\n' +
    '\n' +
    ' }\n' +
    ' const handleCancel = () => {\n' +
    '  message.info(\'取消表单填写\')\n' +
    '  setUpdateView(false);\n' +
    '  setFormValue(undefined);\n' +
    ' }\n' +
    ' const updateUser = (row: any) => {\n' +
    '  setUpdateView(true);\n' +
    '  setFormValue(row);\n' +
    ' }\n' +
    ' const formColumns: Array<IFormColumns> = [\n' +
    '  { label: \'姓名\', type: \'text\', name: \'name\', rules: [{ required: true }] },\n' +
    '  { label: \'性别\', type: \'inputNumber\', name: \'age\', rules: [{ required: true }] },\n' +
    '  { label: \'年龄\', type: \'radio\', name: \'sex\', rules: [{ required: true }], option: [{ key: \'男\', value: \'男\' }, { key: \'女\', value: \'女\' }] },\n' +
    '  { label: \'id\', type: \'hidden\', name: \'id\', rules: [{ required: false }] },\n' +
    ' ]\n' +
    ' const columns = [\n' +
    '  { title: \'序号\', dataIndex: \'id\' },\n' +
    '  { title: \'姓名\', dataIndex: \'name\' },\n' +
    '  { title: \'性别\', dataIndex: \'sex\' },\n' +
    '  { title: \'年龄\', dataIndex: \'age\' },\n' +
    '  {\n' +
    '   title: \'操作\', dataIndex: \'opt\', render: (text: any, row: any) => {\n' +
    '    return <div>\n' +
    '     <Button disabled={row.status === 0} type="link" onClick={() => updateUser(row)}>编辑</Button>\n' +
    '    </div>;\n' +
    '   }\n' +
    '  }\n' +
    ' ]\n' +
    ' return <Row>\n' +
    '  <Table<any>\n' +
    '   dataSource={userList}\n' +
    '   columns={columns}\n' +
    '   rowKey={(r: any) => r.id}\n' +
    '   bordered={true}\n' +
    '  />\n' +
    '  <Modal visible={updateView} title="编辑用户" footer={null} maskClosable={false} onCancel={handleCancel}>\n' +
    '   <CommonHorizFormHook\n' +
    '    submitLoading={submitLoading}\n' +
    '    formColumns={formColumns}\n' +
    '    footerBtn={true}\n' +
    '    formValue={formValue}\n' +
    '    OK={handleOK}\n' +
    '    cancel={handleCancel} />\n' +
    '  </Modal>\n' +
    ' </Row>\n' +
    '}';
  return (
    <Row>
      <TitleWithDescription title="CommonHorizFormHook" content="使用 Hook 写的公共表单，可以赋值不需要模态框 forcerender, 建议大家使用 Hook 表单。" style={{ marginBottom: 50 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API title="CommonHorizFormHook" description="属性和 class 版本的一样，添加了一个表单值的属性" dataList={apiList} />
    </Row>
  );
};
export default HookForm;
