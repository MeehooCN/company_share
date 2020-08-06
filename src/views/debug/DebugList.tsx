/**
 * @description: debug 分享
 * @author: cnn
 * @createTime: 2020/7/21 17:16
 **/
import React, { useState } from 'react';
import { Menu, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import { EchartsYError, InitialingGradle } from '@views/index';
import { initMenu } from '@utils/CommonFunc';
import { menuList } from '@views/debug/menuList';
import { MenuData } from '@utils/CommonInterface';

const DebugList = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(['echartsYError']);
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
          {initMenu(menuList, '/debugs/')}
        </Menu>
      </Col>
      <Col span={20} style={{ padding: '20px 50px' }}>
        <Route path="/debugs/echartsYError" component={EchartsYError} />
        <Route path="/debugs/initialingGradle" component={InitialingGradle} />
      </Col>
    </Row>
  );
};
export default DebugList;
