/**
 * @description: debug 分享
 * @author: cnn
 * @createTime: 2020/7/21 17:16
 **/
import React from 'react';
import { Menu, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import { EchartsYError } from '@views/index';
import { initMenu } from '@utils/CommonFunc';
import { menuList } from '@views/debug/menuList';

interface IProps {}

interface IState {
  selectedKeys: Array<string>,
  openKeys: Array<string>
}

class DebugList extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    selectedKeys: ['echartsYError'],
    openKeys: ['react']
  };
  // 选择菜单
  private selectMenu = (item: any) => {
    this.setState({ selectedKeys: item.keyPath });
  };
  // 选择带子菜单的菜单
  private selectSubMenu = (openKeys: any) => {
    this.setState({ openKeys });
  };
  render(): React.ReactNode {
    const { selectedKeys, openKeys } = this.state;
    return (
      <Row>
        <Col span={4}>
          <Menu
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onSelect={this.selectMenu}
            onOpenChange={this.selectSubMenu}
            mode="inline"
          >
            {initMenu(menuList, '/debugs/')}
          </Menu>
        </Col>
        <Col span={20} style={{ padding: '20px 50px' }}>
          <Route path="/debugs/echartsYError" component={EchartsYError} />
        </Col>
      </Row>
    );
  }
}

export default DebugList;
