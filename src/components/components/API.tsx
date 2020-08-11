/**
 * @description: 组件API显示
 * @author: cnn
 * @createTime: 2020/7/21 10:40
 **/
/* eslint no-unused-vars:0 */
import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { TitleWithDescription } from '..';

interface APIData {
  name: string,
  description: string,
  type: string | React.ReactNode,
  defaultValue: string
}

interface IProps {
  dataList: Array<APIData>,
  description?: string,
  title?: string
}

const API = (props: IProps) => {
  const { dataList, description, title } = props;
  const columns: ColumnProps<APIData>[] = [{
    title: '属性',
    dataIndex: 'name'
  }, {
    title: '说明',
    dataIndex: 'description'
  }, {
    title: '类型',
    dataIndex: 'type',
    render: (text: any) => {
      return text;
    }
  }, {
    title: '默认值',
    dataIndex: 'defaultValue'
  }];
  return (
    <div style={{ width: '100%', marginTop: 50 }}>
      <TitleWithDescription title={title || 'API'} titleSize={24} content={description || '暂无描述。'} />
      <Table<APIData>
        columns={columns}
        dataSource={dataList}
        size="small"
        bordered={true}
        pagination={false}
        rowKey={(record: APIData) => record.name}
        style={{ marginTop: 10 }}
      />
    </div>
  );
};
export default API;
