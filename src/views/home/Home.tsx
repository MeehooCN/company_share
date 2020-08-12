/**
 * @description: 主页
 * @author: cnn
 * @createTime: 2020/7/16 17:03
 **/
import React from 'react';
import { Row, Layout, BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { Header } from '@components/index';
import './index.less';

const { Content } = Layout;

interface IProps {
  children: any
}

const Home = (props: IProps) => {
  const { children } = props;
  return (
    <Row style={{ width: '100%' }}>
      <Header />
      <Content style={{ width: '100%' }}>
        {children}
      </Content>
      <BackTop>
        <div className="back-top">
          <VerticalAlignTopOutlined style={{ color: '#fff', fontSize: 20 }} />
        </div>
      </BackTop>
    </Row>
  );
};

export default Home;
