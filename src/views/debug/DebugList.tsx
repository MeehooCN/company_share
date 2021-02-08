/**
 * @description: debug 分享
 * @author: cnn
 * @createTime: 2020/7/21 17:16
 **/
import React, { useEffect, useState } from 'react';
import { Menu, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import { EchartsYError, InitialingGradle, IOSNoFix } from '@views/index';
import { getActiveChildMenu, initMenu, setActiveChildMenu } from '@utils/CommonFunc';
import { menuList } from '@views/debug/menuList';
import { MenuData } from '@utils/CommonInterface';
import { platform } from '@utils/CommonVars';

const DebugList = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(['echartsYError']);
  const [openKeys, setOpenKeys] = useState<Array<string>>(menuList.map((menu: MenuData) => menu.key));
  const setSelectedMenu = (selectedKeys: Array<string>) => {
    setSelectedKeys(selectedKeys);
    setActiveChildMenu(selectedKeys.length > 0 ? selectedKeys[0] : '');
  };
  useEffect(() => {
    const activeMenu = getActiveChildMenu();
    if (activeMenu) {
      setSelectedKeys([activeMenu]);
    }
  }, []);
  return (
    <Row>
      <Col span={4}>
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onSelect={(item: any) => setSelectedMenu(item.keyPath)}
          onOpenChange={(openKeys: any) => setOpenKeys(openKeys)}
          mode="inline"
        >
          {initMenu(menuList, platform + 'debugs/')}
        </Menu>
      </Col>
      <Col span={20} style={{ padding: '20px 50px' }}>
        <Route path={platform + 'debugs/echartsYError'} component={EchartsYError} />
        <Route path={platform + 'debugs/initialingGradle'} component={InitialingGradle} />
        <Route path={platform + 'debugs/IOSNoFix'} component={IOSNoFix} />
      </Col>
    </Row>
  );
};
export default DebugList;
