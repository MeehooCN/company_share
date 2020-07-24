/**
 * @description: 主页
 * @author: cnn
 * @createTime: 2020/7/16 17:03
 **/
import React from 'react';
import { Row, Layout, BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { Header } from '@components/index';
import { colors } from '@utils/CommonVars';
import './index.less';

const { Content } = Layout;

interface IProps {}

interface IState {
  loading: boolean
}

class Home extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    loading: false
  };
  public render(): React.ReactNode {
    const { loading } = this.state;
    return (
      <Row style={{ width: '100%' }}>
        <Header />
        <Content style={{ width: '100%' }}>
          {!loading && this.props.children}
        </Content>
        <BackTop>
          <div className="back-top" style={{ backgroundColor: colors.primaryColor }}>
            <VerticalAlignTopOutlined style={{ color: '#fff', fontSize: 20 }} />
          </div>
        </BackTop>
      </Row>
    );
  }
}

export default Home;
