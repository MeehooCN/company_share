/**
 * @description: 主页
 * @author: cnn
 * @createTime: 2020/7/16 17:03
 **/
import React, { useEffect, useState } from 'react';
import { Row, Layout, BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { Header, Loading } from '@components/index';
import { useHistory } from 'react-router-dom';
import { setActiveChildMenu, setActiveMenu } from '@utils/CommonFunc';
import './index.less';

const { Content } = Layout;

interface IProps {
  children: any
}

const Home = (props: IProps) => {
  const { children } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  useEffect(() => {
    const pathname: string = history.location.pathname;
    if (pathname === '/') {
      setActiveMenu('');
      setActiveChildMenu('');
    }
    setLoading(false);
  }, []);
  return (
    <Row style={{ width: '100%' }}>
      <Header />
      <Content style={{ width: '100%' }}>
        {loading ? <Loading loading={loading} /> : children}
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
