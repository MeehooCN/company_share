/**
 * @description: 组件列表
 * @author: cnn
 * @createTime: 2020/7/21 9:19
 **/
/* eslint no-unused-vars:0 */
import React from 'react';
import { Menu, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import {
  MyTitle, ImageListView, ImageView, FormDemoHook, FormDemoClass,
  HookForm, InlineSearchFormDemo, ImageCompare, LoadingView, OverTextView,
  PromptIndex, ImageListHorizontalView, EvaluateView, IconFontView, MyRangePickerView,
  CodeLogin, ImageLogin, SearchInputView, AttachmentView, ImageListWithView
} from '@views/index';
import { initMenu } from '@utils/CommonFunc';
import { menuList } from '@views/components/menuList';
import { platform } from '@utils/CommonVars';
import { useMenuHook } from '@components/index';

const ComponentList = () => {
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
          {initMenu(menuList, platform + 'components/')}
        </Menu>
      </Col>
      <Col span={20} style={{ padding: '20px 50px' }}>
        <Route path={platform + 'components/myTitle'} component={MyTitle} />
        <Route path={platform + 'components/imageList'} component={ImageListView} />
        <Route path={platform + 'components/imageView'} component={ImageView} />
        <Route path={platform + 'components/imageCompare'} component={ImageCompare} />
        <Route path={platform + 'components/imageListHorizontal'} component={ImageListHorizontalView} />
        <Route path={platform + 'components/imageListWithView'} component={ImageListWithView} />
        <Route path={platform + 'components/hookForm'} component={HookForm} />
        <Route path={platform + 'components/searchForm'} component={InlineSearchFormDemo} />
        <Route path={platform + 'components/commonForm'} component={FormDemoHook} />
        <Route path={platform + 'components/commonFormClass'} component={FormDemoClass} />
        <Route path={platform + 'components/loading'} component={LoadingView} />
        <Route path={platform + 'components/overText'} component={OverTextView} />
        <Route path={platform + 'components/prompt'} component={PromptIndex} />
        <Route path={platform + 'components/evaluate'} component={EvaluateView} />
        <Route path={platform + 'components/searchInput'} component={SearchInputView} />
        <Route path={platform + 'components/iconFontChoose'} component={IconFontView} />
        <Route path={platform + 'components/rangePicker'} component={MyRangePickerView} />
        <Route path={platform + 'components/codeLogin'} component={CodeLogin} />
        <Route path={platform + 'components/imageLogin'} component={ImageLogin} />
        <Route path={platform + 'components/attachmentView'} component={AttachmentView} />
      </Col>
    </Row>
  );
};

export default ComponentList;
