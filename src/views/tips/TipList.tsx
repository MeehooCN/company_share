/**
 * @description: 技巧列表
 * @author: cnn
 * @createTime: 2020/7/21 15:12
 **/
import React, { useState } from 'react';
import { Menu, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import { CreatePortal, ReactFragments, ErrorBoundaries, BasicProject, ParentComponents, Yalc } from '@views/index';
import { initMenu } from '@utils/CommonFunc';
import { menuList } from '@views/tips/menuList';
import { MenuData } from '@utils/CommonInterface';

const TipList = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(['basicProject']);
  const [openKeys, setOpenKeys] = useState<Array<string>>(menuList.map((menu: MenuData) => menu.key));
  return (
    <Row>
      <Col span={4}>
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onSelect={(item: any) => setSelectedKeys(item.keyPath)}
          onOpenChange={(openKeys: any) => setOpenKeys(openKeys)}
          mode="inline"
        >
          {initMenu(menuList, '/tips/')}
        </Menu>
      </Col>
      <Col span={20} style={{ padding: '20px 50px' }}>
        <Route path="/tips/basicProject" component={BasicProject} />
        <Route path="/tips/createPortal" component={CreatePortal} />
        <Route path="/tips/reactFragments" component={ReactFragments} />
        <Route path="/tips/errorBoundaries" component={ErrorBoundaries} />
        <Route path="/tips/parentComponents" component={ParentComponents} />
        <Route path="/tips/yalc" component={Yalc} />
      </Col>
    </Row>
  );
};

export default TipList;
