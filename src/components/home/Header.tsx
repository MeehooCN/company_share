/**
 * @description: Header
 * @author: cnn
 * @createTime: 2020/7/21 9:39
 **/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Menu } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import { colors, platform } from '@utils/CommonVars';
import { setActiveMenu, getActiveMenu, setActiveChildMenu } from '@utils/CommonFunc';
import './index.less';

const menuList = [{
  key: 'components',
  name: '组件',
  url: platform + 'components/myTitle'
}, {
  key: 'tips',
  name: 'Tips',
  url: platform + 'tips/basicProject'
}, {
  key: 'sources',
  name: '资源',
  url: platform + 'resources'
}, {
  key: 'debug',
  name: 'Debug 分享',
  url: platform + 'debugs/echartsYError'
}, {
  key: 'designRules',
  name: '设计规范',
  url: platform + 'designRules/buttonPosition'
}];
const Header = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>();
  const setSelectedMenu = (selectedKeys: Array<string>) => {
    setSelectedKeys(selectedKeys);
    setActiveChildMenu('');
    setActiveMenu(selectedKeys.length > 0 ? selectedKeys[0] : '');
  };
  useEffect(() => {
    const activeMenu = getActiveMenu();
    if (activeMenu) {
      setSelectedKeys([activeMenu]);
    }
  }, []);
  return (
    <Row className="header header-shadow" justify="space-between" style={{ width: '100%' }}>
      <Link to={platform} style={{ display: 'flex', alignItems: 'center' }} onClick={() => setSelectedMenu([])}>
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
        onSelect={(item: any) => setSelectedMenu(item.keyPath)}
      >
        {menuList.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.url}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Row>
  );
};
export default Header;
