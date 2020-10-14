/**
 * @description: 图标列表
 * @author: cnn
 * @createTime: 2020/10/14 15:13
 **/
import React, { useState } from 'react';
import { Row } from 'antd';
import { API, CodeExample, TitleWithDescription, IconFontChoose } from '@components/index';

const IconFontView = () => {
  const [selectIcon, setSelectIcon] = useState<string>('');
  const code = '<IconFontChoose onClick={(icon: string) => setSelectIcon(icon)} />';
  const paramList = [{
    name: 'onClick',
    description: '点击图标后回调函数。',
    type: 'Function',
    defaultValue: ''
  }];
  const getViewComponents = () => {
    return (
      <div style={{ width: '100%' }}>
        <Row style={{ marginBottom: 10 }}>当前选中图标： {selectIcon === '' ? '请点击图标' : selectIcon}</Row>
        <IconFontChoose onClick={(icon: string) => setSelectIcon(icon)} />
      </div>
    );
  };
  return (
    <Row>
      <TitleWithDescription title="IconFontChoose" content="选择图标。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={getViewComponents()} code={code} />
      <API dataList={paramList} />
    </Row>
  );
};
export default IconFontView;
