/**
 * @description: 选择菜单图标
 * @author: cnn
 * @createTime: 2020/10/14 10:42
 **/
import React, { useRef } from 'react';
import { Row, message } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import './iconFontChoose.less';

const iconList: Array<string> = require('./iconList.json');
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2128119_azpz6axvjos.js',
});

/**
 * @params:
 * onClick: 点击图标后回调
 * canCopy: 是否可以复制
 * **/
interface IProps {
  onClick(icon: string): void,
  canCopy?: boolean
}

const IconFontChoose = (props: IProps) => {
  const { onClick, canCopy } = props;
  const inputRef: any = useRef();
  const onIconClick = (e: any, item: string) => {
    onClick(item);
    if (canCopy) {
      inputRef.current.value = item;
      inputRef.current.select();
      // 执行浏览器复制命令
      document.execCommand('copy');
      message.success(item + ' 复制成功！')
    }
  };
  return (
    <Row style={{ width: '100%' }}>
      <input ref={inputRef} type="text" style={{ position: 'absolute', top: 0, left: 0, opacity: 0, zIndex: -999 }} />
      {iconList.map((item: string) => (
        <IconFont
          className="icon-font"
          key={item}
          type={item}
          onClick={(e: any) => onIconClick(e, item)}
        />
      ))}
    </Row>
  );
};
export default IconFontChoose;
