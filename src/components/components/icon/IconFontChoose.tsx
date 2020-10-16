/**
 * @description: 选择菜单图标
 * @author: cnn
 * @createTime: 2020/10/14 10:42
 **/
import React from 'react';
import {Row, Typography} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import './iconFontChoose.less';
const { Paragraph } = Typography;

const iconList: Array<string> = require('./iconList.json');
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2128119_azpz6axvjos.js',
});

/**
 * @params:
 * onClick: 点击图标后回调
 * **/
interface IProps {
  onClick(icon: string): void
}

const IconFontChoose = (props: IProps) => {
  const { onClick } = props;
  return (
    <Row style={{ width: '100%' }}>
      {iconList.map((item: string) => (
        <Paragraph key={item} copyable={{
          tooltips: false, text: item,
          icon: [<IconFont key={item + 'copy-icon'} className="icon-font" type={item} onClick={() => onClick(item)} />]
        }}></Paragraph>
      ))}
    </Row>
  );
};
export default IconFontChoose;
