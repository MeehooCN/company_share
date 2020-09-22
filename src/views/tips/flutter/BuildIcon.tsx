/**
 * @description: 命令行生成应用图标
 * @author: cnn
 * @createTime: 2020/8/17 16:41
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, CodeBox } from '@components/index';

const BuildIcon = () => {
  const code1: string = 'dependencies:\n' +
    '  flutter_launcher_icons: ^0.7.5\n' +
    '\n' +
    'flutter_icons:\n' +
    '  android: "ic_launcher" \n' +
    '  ios: true\n' +
    '  image_path: "assets/icon/icon.png"';
  const code2: string = 'flutter packages pub run flutter_launcher_icons:main';
  return (
    <div>
      <TitleWithDescription
        title="Launcher Icons"
        content="命令行生成应用图标。"
        url="https://pub.dev/packages/flutter_launcher_icons"
      />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">在 pubspec.yaml 中添加：</Row>
        <CodeBox code={code1} />
        <Row className="description">然后你需要准备一张分辨率为 1024 x 1024 的 png 图片，放入 assets/icon，名称为 icon.png，然后运行：</Row>
        <CodeBox code={code2} />
      </Row>
    </div>
  );
};
export default BuildIcon;
