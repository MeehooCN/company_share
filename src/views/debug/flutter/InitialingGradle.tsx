/**
 * @description: flutter initializing gradle...
 * @author: cnn
 * @createTime: 2020/8/4 14:32
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription } from '@components/index';

const InitialingGradle = () => {
  return (
    <div>
      <TitleWithDescription title="Flutter initializing gradle..." content="运行项目卡在 flutter initializing gradle..." />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">1. 首先删除 C:\Users\当前用户.gradle\wrapper\dists\ 目录。</Row>
        <Row className="description">2. 在你的项目运行 flutter run命令，这个时候会在C:\Users\当前用户.gradle\wrapper\dists\ 目录下面生成一个目录，比如我的是 C:\Users\smk.gradle\wrapper\dists\gradle-4.10.2-all\9fahxiiecdb76a5g3aw9oi8rv。</Row>
        <Row className="description">3. 我们只要手动去下载gradle-4.10.2-all.zip，放到9fahxiiecdb76a5g3aw9oi8rv目录里面就可以了。</Row>
      </Row>
    </div>
  );
};
export default InitialingGradle;
