/**
 * @description: 组件列表
 * @author: cnn
 * @createTime: 2020/7/21 9:19
 **/
/* eslint no-unused-vars:0 */
import React, { useEffect, useState } from 'react';
import { Menu, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import {
  MyTitle, ImageListView, ImageView, FormDemoHook, FormDemoClass,
  HookForm, InlineSearchFormDemo, ImageCompare, LoadingView, OverTextView,
  PromptIndex, ImageListHorizontalView
} from '@views/index';
import { getActiveChildMenu, initMenu, setActiveChildMenu } from '@utils/CommonFunc';
import { menuList } from '@views/components/menuList';
import { MenuData } from '@utils/CommonInterface';

const ComponentList = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(['myTitle']);
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
          {initMenu(menuList, '/components/')}
        </Menu>
      </Col>
      <Col span={20} style={{ padding: '20px 50px' }}>
        <Route path="/components/myTitle" component={MyTitle} />
        <Route path="/components/imageList" component={ImageListView} />
        <Route path="/components/imageView" component={ImageView} />
        <Route path="/components/imageCompare" component={ImageCompare} />
        <Route path="/components/imageListHorizontal" component={ImageListHorizontalView} />
        <Route path="/components/hookForm" component={HookForm} />
        <Route path="/components/searchForm" component={InlineSearchFormDemo} />
        <Route path="/components/commonForm" component={FormDemoHook} />
        <Route path="/components/commonFormClass" component={FormDemoClass} />
        <Route path="/components/loading" component={LoadingView} />
        <Route path="/components/overText" component={OverTextView} />
        <Route path="/components/prompt" component={PromptIndex} />
      </Col>
    </Row>
  );
};

export default ComponentList;
