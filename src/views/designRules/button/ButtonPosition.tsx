/**
 * @description: ~~
 * @author: cy
 * @createTime: 2020/8/13 13:24
 **/
import React from 'react';
import { Button, Card, Col, Row, Space, Skeleton } from 'antd';
import CardFooterLine from '@components/components/designRules/CardFooterLine';
import { TitleWithDescription } from '@components/index';

const ButtonPosition = () => {
  return (
    <>
      <TitleWithDescription title="'Z'型模式" content="源自 Gutenberg diagram，用户关注流(通常含鼠标移动)遵循一个 Z 字形模式，它描述了西方用户的阅读模式，从页面的左上角到右下角。" titleSize={24} style={{ margin: '20px 0px' }} />
      <Row style={{ width: '100%', background: '#f0f2f5', padding: 20 }} gutter={8}>
        <Col span={12}>
          <Card title="客户信息"
            extra={<Space>
              <Button>重置</Button>
              <Button type="primary">更新内容</Button>
            </Space>}
          >
            <Skeleton />
            <CardFooterLine />
            <Row justify="end">
              <Space>
                <Button>取消</Button>
                <Button type="primary">完成</Button>
              </Space>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="客户信息"
            extra={<Space>
              <Button>重置</Button>
              <Button type="primary">更新内容</Button>
            </Space>}
          >
            <Skeleton />
            <CardFooterLine />
            <Row justify="end">
              <Skeleton.Button />
            </Row>
          </Card>
        </Col>
      </Row>
      <TitleWithDescription title="'F'型模式" content="Jacob Nielsen 首先提出该模式后并提供了眼球追踪研究结果，关注流顺序如下图。按钮跟随内容模式在以下的这个研究中被证明非常自然。" titleSize={24} style={{ margin: '20px 0px' }} />
      <Row style={{ width: '100%', background: '#f0f2f5', padding: 20 }} gutter={8}>
        <Col span={12}>
          <Card title="客户信息"
            extra={<Space>
              <Button></Button>
            </Space>}
          >
            <Skeleton />
            <Row justify="start" style={{ marginTop: 32 }}>
              <Space>
                <Button>取消</Button>
                <Button type="primary">完成</Button>
              </Space>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="客户信息"
            extra={<Space>
              <Button></Button>
            </Space>}
          >
            <Row justify="space-between" >
              <Skeleton.Input style={{ width: 200 }} />
              <Space>
                <Button>重置</Button>
                <Button type="primary">查询</Button>
              </Space>
            </Row>
            <div style={{ width: '100%', height: 172, background: '#f0f2f5', marginTop: 10 }}>

            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ButtonPosition;
