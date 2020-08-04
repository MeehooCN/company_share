/**
 * @description: yalc 将源代码打包用在自己项目中
 * @author: cnn
 * @createTime: 2020/8/4 14:16
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, CodeBox } from '@components/index';

const Yalc = () => {
  const code1: string = 'npm install -g yalc';
  const code2: string = 'yalc push';
  const code3: string = 'yalc link 包名';
  const code4: string = 'yalc push';
  return (
    <div>
      <TitleWithDescription
        title="Yalc"
        content="将源代码打包用在自己项目中"
        url="https://github.com/whitecolor/yalc"
      />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">全局安装 yalc ：</Row>
        <CodeBox code={code1} />
        <Row className="description">进入相应的源代码项目中执行：</Row>
        <CodeBox code={code2} />
        <Row className="description">进入到要使用该包的项目中执行：</Row>
        <CodeBox code={code3} />
        <Row className="description">若有修改源代码只须重新打包再：</Row>
        <CodeBox code={code4} />
      </Row>
    </div>
  );
};
export default Yalc;
