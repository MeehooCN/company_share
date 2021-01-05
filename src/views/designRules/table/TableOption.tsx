/**
 * @description: 表格中的一些操作
 * @author: cy
 * @createTime: 2020/11/6 10:25
 **/
import React, {CSSProperties, useState} from 'react';
import {Button, Card, message, Modal, Table, Space, Popconfirm, Row} from 'antd';
import {CommonHorizFormHook} from '@components/components/form/CommonHorizFormHook';
import {IFormColumns} from '@components/components/form/CommonHorizForm';
import {sexOption} from '@views/components/form/FormCommonVar';
import { ReloadOutlined, SyncOutlined } from '@ant-design/icons';
import {TitleWithDescription} from '@components/index';
// 无边框卡片Card的props
const useCardProps = (title: string | React.ReactNode, style?: CSSProperties, size?: 'default' | 'small') => {
  return ({
    bordered: false,
    title: title,
    style: style || { width: '100%' },
    size: size || 'default'
  });
};
interface IUser {
  id: string,
  name: string,
  sex: '男' | '女',
  age: number
}
const initList: Array<IUser> = [
  { id: '1', name: 'jack', sex: '男', age: 18 },
  { id: '2', name: 'rose', sex: '女', age: 16 },
  { id: '3', name: 'tom', sex: '男', age: 21 },
];
const TableOption = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [formValue, setFormValue] = useState();
  const [userList, setUserList] = useState<Array<IUser>>(initList);
  const [loading, setLoading] = useState<boolean>(false);
  const [userMate, setUserMate] = useState<Array<IUser>>(initList);
  const updateUser = (row: any) => {
    setUpdateView(true);
    setFormValue(row);
  };
  const handleCancel = () => {
    // message.info('取消表单填写');
    setUpdateView(false);
    setFormValue(undefined);
  };
  const handleOK = (content: any) => {
    setSubmitLoading(true);
    message.success('提交表单');
    setLoading(true);
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
      setLoading(false);
    }, 1000);
  };
  const refreshTable = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const rebackData = () => {
    setLoading(true);
    setUserList(userMate);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleDelete = (row: IUser) => {
    const newUserList = [...userList];
    let userIndex = newUserList.findIndex((item: IUser) => item.id === row.id);
    newUserList.splice(userIndex, 1);
    setUserList(newUserList);
  };
  const cardProps = useCardProps('表格操作');
  const columns = [
    { title: '序号', dataIndex: 'id' },
    { title: '姓名', dataIndex: 'name' },
    { title: '性别', dataIndex: 'sex' },
    { title: '年龄', dataIndex: 'age' },
    {
      title: '操作', dataIndex: 'opt', width: 100, render: (text: any, row: IUser) => {
        return <Space>
          <Button type="link" onClick={() => updateUser(row)}>编辑</Button>
          <Popconfirm title="确定删除此人员？" onConfirm={() => handleDelete(row)} okText="确定" cancelText="取消">
            <Button type="link">删除</Button>
          </Popconfirm>
        </Space>;
      }
    }
  ];
  const formColumns: Array<IFormColumns> = [
    { label: '姓名', type: 'text', name: 'name', rules: [{ required: true }] },
    { label: '性别', type: 'inputNumber', name: 'age', rules: [{ required: true }] },
    { label: '年龄', type: 'radio', name: 'sex', rules: [{ required: true }], option: sexOption },
    { label: 'id', type: 'hidden', name: 'id', rules: [{ required: false }] },
  ];
  return (<div>
    <Card {...cardProps} extra={<Space>
      <Button onClick={rebackData} icon={<ReloadOutlined />}>重置</Button>
      <Button onClick={refreshTable} icon={<SyncOutlined />}>刷新</Button>
    </Space>}>
      <Table<IUser>
        loading={loading}
        dataSource={userList}
        columns={columns}
        rowKey={(r: any) => r.id}
        bordered={true}
        style={{ width: '100%' }}
      />
    </Card>
    <Space direction="vertical">
      <TitleWithDescription title="表格操作按钮" content="操作按钮的列宽和按钮平铺的宽度匹配，不能过宽也不要过窄至换行。使用 Space 组件包裹按钮，按钮之间的间距一定" titleSize={24} />
      <TitleWithDescription title="表格渲染" content="表格加载数据、刷新数据需要设置 loading" titleSize={24} />
      <TitleWithDescription title="数据项编辑" content="某列数据项编辑时，点击表单的 ‘确定’ 时设置确定的 loading 避免多次提交， 提交完成后再清空表单的值" titleSize={24} />
      <TitleWithDescription title="删除数据项" content="删除某项时，需要有确认框提示用户是否删除，避免误删" titleSize={24} />

    </Space>
    <Modal visible={updateView} title="编辑用户" footer={null} maskClosable={false} onCancel={handleCancel}>
      <CommonHorizFormHook
        submitLoading={submitLoading}
        formColumns={formColumns}
        footerBtn={true}
        formValue={formValue}
        OK={handleOK}
        cancel={handleCancel}
        notReset={true}
      />
    </Modal>
  </div>);
};
export default TableOption;
