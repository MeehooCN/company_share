/**
 * @description: ~~
 * @author: cy
 * @createTime: 2020/8/13 13:22
 **/
import React from 'react';
import { Button, Card, Result, Row, Skeleton, Space, Steps, Dropdown, Menu } from 'antd';
import { TitleWithDescription } from '@components/index';
const { Step } = Steps;

function handleMenuClick(e: any) {
  console.log('click', e);
}
const ButtonType = () => {
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Row style={{ paddingBottom: 20 }}>
        <TitleWithDescription title="风险操作" content="可能造成损失的操作，特别是破坏性操作，如果不是用户期望点击的按钮，应该尽量远离常用按钮。" titleSize={24} style={{ margin: '20px 0px' }} />
        <Space>
          <Button danger>警示操作</Button>
          <Button>次要操作</Button>
          <Button type="primary" >主要操作</Button>
        </Space>
      </Row>
      <Row style={{ paddingBottom: 20 }}>
        <TitleWithDescription title="方向性含义" content="什么是方向性含义？具有返回意义的按钮，应该放在左侧，暗示其方向是回到之前。左图的方案非常容易误操作，方向错乱挑战用户的认知习惯，因为不论是在网页还是移动端界面，我们已经都习惯了返回在左侧的模式。" titleSize={24} style={{ margin: '20px 0px' }} />
        <Card >
          <Steps>
            <Step title="Step 1" description="This is a description." />
            <Step title="Step 2" description="This is a description." />
            <Step title="Step 3" description="This is a description." />
          </Steps>
          <Skeleton />
          <Space>
            <Button>上一步</Button>
            <Button>下一步</Button>
          </Space>
        </Card>
      </Row>
      <Row style={{ paddingBottom: 20 }}>
        <TitleWithDescription title="响应式" content="指是按钮如何在响应式环境中优雅的溢出。这一项条件对规则设计的影响是，我们把溢出按钮“…”统一放置在最右侧。" titleSize={24} style={{ margin: '20px 0px' }} />
        <Card >
          <Space>
            <Button danger>警示操作</Button>
            <Button>次要操作</Button>
            <Button type="primary" >主要操作二</Button>
            <Button type="primary" >主要操作一</Button>
            <Dropdown.Button overlay={menu}>更多</Dropdown.Button>
          </Space>
        </Card>
      </Row>
    </>
  );
};
export default ButtonType;
