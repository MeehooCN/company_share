/**
 * @description: 资源推荐
 * @author: cnn
 * @createTime: 2020/7/21 16:09
 **/
/* eslint no-unused-vars:0 */
import React from 'react';
import { Col, Row, Space, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { TitleWithDescription } from '@components/index';
import { IntroduceComponent, Resource } from '@utils/CommonInterface';
import { reactResourceList, flutterResourceList } from '@views/resources/ResourceData';

const ResourceList = () => {
  const columns: ColumnProps<Resource>[] = [{
    title: '类型',
    dataIndex: 'type',
    width: 200
  }, {
    title: '推荐组件',
    dataIndex: 'introduceComponentList',
    render: (introduceComponentList: Array<IntroduceComponent>) => {
      const introduceComponents = introduceComponentList.map((item: IntroduceComponent) => (
        <a key={item.name} href={item.link} target="_blank">{item.name}</a>
      ));
      return (
        <Space size="middle">
          {introduceComponents}
        </Space>
      );
    }
  }];
  return (
    <Row style={{ width: '100%', padding: 10 }} justify="center">
      <Col span={20}>
        <TitleWithDescription title="React 资源分享" content="" />
        <Table<Resource>
          columns={columns}
          dataSource={reactResourceList}
          bordered={true}
          pagination={false}
          rowKey={(record: Resource) => record.type}
          style={{ width: '100%', marginTop: 10 }}
        />
        <TitleWithDescription title="Flutter 资源分享" content="" style={{ marginTop: 30 }} />
        <Table<Resource>
          columns={columns}
          dataSource={flutterResourceList}
          bordered={true}
          pagination={false}
          rowKey={(record: Resource) => record.type}
          style={{ width: '100%', marginTop: 10 }}
        />
      </Col>
    </Row>
  );
};
export default ResourceList;
