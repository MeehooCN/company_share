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
  PromptIndex, ImageListHorizontalView, EvaluateView, IconFontView, MyRangePickerView,
  CodeLogin, ImageLogin
} from '@views/index';
import { getActiveChildMenu, initMenu, setActiveChildMenu } from '@utils/CommonFunc';
import { menuList } from '@views/components/menuList';
import { MenuData } from '@utils/CommonInterface';
import { platform } from '@utils/CommonVars';

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
          {initMenu(menuList, platform + 'components/')}
        </Menu>
      </Col>
      <Col span={20} style={{ padding: '20px 50px' }}>
        <Route path={platform + 'components/myTitle'} component={MyTitle} />
        <Route path={platform + 'components/imageList'} component={ImageListView} />
        <Route path={platform + 'components/imageView'} component={ImageView} />
        <Route path={platform + 'components/imageCompare'} component={ImageCompare} />
        <Route path={platform + 'components/imageListHorizontal'} component={ImageListHorizontalView} />
        <Route path={platform + 'components/hookForm'} component={HookForm} />
        <Route path={platform + 'components/searchForm'} component={InlineSearchFormDemo} />
        <Route path={platform + 'components/commonForm'} component={FormDemoHook} />
        <Route path={platform + 'components/commonFormClass'} component={FormDemoClass} />
        <Route path={platform + 'components/loading'} component={LoadingView} />
        <Route path={platform + 'components/overText'} component={OverTextView} />
        <Route path={platform + 'components/prompt'} component={PromptIndex} />
        <Route path={platform + 'components/evaluate'} component={EvaluateView} />
        <Route path={platform + 'components/iconFontChoose'} component={IconFontView} />
        <Route path={platform + 'components/rangePicker'} component={MyRangePickerView} />
        <Route path={platform + 'components/codeLogin'} component={CodeLogin} />
        <Route path={platform + 'components/imageLogin'} component={ImageLogin} />
      </Col>
    </Row>
  );
};

export default ComponentList;
