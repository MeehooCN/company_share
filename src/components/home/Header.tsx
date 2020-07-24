/**
 * @description: Header
 * @author: cnn
 * @createTime: 2020/7/21 9:39
 **/
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Menu } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import { colors } from '@utils/CommonVars';
import './index.less';

interface IProps {}

interface IState {
  selectedKeys: Array<string>
}

class Header extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    selectedKeys: []
  };
  // 选择菜单
  private selectMenu = (item: any) => {
    this.setState({ selectedKeys: item.keyPath });
  };
  render(): React.ReactNode {
    const { selectedKeys } = this.state;
    return (
      <Row className="header header-shadow" justify="space-between" style={{ width: '100%' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }} onClick={() => this.setState({ selectedKeys: [] })}>
          <Row justify="center" align="middle">
            <SmileTwoTone twoToneColor={colors.primaryColor} style={{ fontSize: 24 }} />
            <div style={{ marginLeft: 10, marginRight: 10, color: colors.primaryColor }}>分享平台</div>
            <SmileTwoTone twoToneColor={colors.primaryColor} style={{ fontSize: 24 }} />
          </Row>
        </Link>
        <Menu
          style={{ border: 0 }}
          mode="horizontal"
          selectedKeys={selectedKeys}
          onSelect={this.selectMenu}
        >
          <Menu.Item key="components">
            <Link to="/components/myTitle">组件</Link>
          </Menu.Item>
          <Menu.Item key="tips">
            <Link to="/tips/createPortal">Tips</Link>
          </Menu.Item>
          <Menu.Item key="sources">
            <Link to="/resources">资源</Link>
          </Menu.Item>
          <Menu.Item key="debug">
            <Link to="/debugs/echartsYError">Debug 分享</Link>
          </Menu.Item>
        </Menu>
      </Row>
    );
  }
}
export default Header;
