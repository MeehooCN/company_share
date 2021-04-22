/**
 * @description: 技巧列表
 * @author: cnn
 * @createTime: 2020/7/21 15:12
 **/
import React from 'react';
import { Menu, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import {
  CreatePortal, ReactFragments, ErrorBoundaries, BasicProject, ParentComponents,
  Yalc, UseEffect, WebStormESLint, BuildIcon, IconFont,
  SmallerEcharts, UseRedux, UploadLimit
} from '@views/index';
import { initMenu } from '@utils/CommonFunc';
import { menuList } from '@views/tips/menuList';
import { platform } from '@utils/CommonVars';
import { useMenuHook } from '@components/index';

const TipList = () => {
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
          {initMenu(menuList, platform + 'tips/')}
        </Menu>
      </Col>
      <Col span={20} style={{ padding: '20px 50px' }}>
        <Route path={platform + 'tips/basicProject'} component={BasicProject} />
        <Route path={platform + 'tips/eslint'} component={WebStormESLint} />
        <Route path={platform + 'tips/iconFont'} component={IconFont} />
        <Route path={platform + 'tips/smallerEcharts'} component={SmallerEcharts} />
        <Route path={platform + 'tips/uploadLimit'} component={UploadLimit} />
        <Route path={platform + 'tips/createPortal'} component={CreatePortal} />
        <Route path={platform + 'tips/reactFragments'} component={ReactFragments} />
        <Route path={platform + 'tips/errorBoundaries'} component={ErrorBoundaries} />
        <Route path={platform + 'tips/parentComponents'} component={ParentComponents} />
        <Route path={platform + 'tips/yalc'} component={Yalc} />
        <Route path={platform + 'tips/useEffect'} component={UseEffect} />
        <Route path={platform + 'tips/launcherIcons'} component={BuildIcon} />
        <Route path={platform + 'tips/useRedux'} component={UseRedux} />
      </Col>
    </Row>
  );
};

export default TipList;
