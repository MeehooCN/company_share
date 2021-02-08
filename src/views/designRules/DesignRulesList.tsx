/**
 * @description: 设计规范
 * @author: cy
 * @createTime: 2020/8/13 11:02
 **/
import React, { useState } from 'react';
import { MenuData } from '@utils/CommonInterface';
import { menuList } from '@views/designRules/menuList';
import { Col, Menu, Row } from 'antd';
import { initMenu } from '@utils/CommonFunc';
import { Route } from 'react-router';
import { ButtonPosition, TableOption } from '@views/designRules/viewExport';
import ButtonType from '@views/designRules/button/ButtonType';
import { platform } from '@utils/CommonVars';

const DesignRulesList = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(['buttonPosition']);
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
          {initMenu(menuList, platform + 'designRules/')}
        </Menu>
      </Col>
      <Col span={20} style={{ padding: '20px 50px' }}>
        <Route path={platform + 'designRules/buttonPosition'} component={ButtonPosition} />
        <Route path={platform + 'designRules/buttonType'} component={ButtonType} />
        <Route path={platform + 'designRules/tableOption'} component={TableOption} />
      </Col>
    </Row>
  );
};
export default DesignRulesList;
