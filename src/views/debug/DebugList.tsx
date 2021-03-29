/**
 * @description: debug 分享
 * @author: cnn
 * @createTime: 2020/7/21 17:16
 **/
import React from 'react';
import { Menu, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import { EchartsYError, InitialingGradle, IOSNoFix } from '@views/index';
import { initMenu } from '@utils/CommonFunc';
import { menuList } from '@views/debug/menuList';
import { platform } from '@utils/CommonVars';
import { useMenuHook } from '@components/index';

const DebugList = () => {
  const { selectedKeys, openKeys, setOpenKeys, setSelectedMenu } = useMenuHook({
    menuList,
    defaultSelectedKeys: ['myTitle']
  });
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
