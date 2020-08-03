/**
 * @description: 组件页面的标题和描述
 * @author: cnn
 * @createTime: 2020/7/21 10:32
 **/
/* eslint no-unused-vars:0 */
import React, { CSSProperties } from 'react';
import { LinkOutlined } from '@ant-design/icons';

interface IProps {
  title: string,
  titleSize?: number,
  content: string,
  style?: CSSProperties,
  id?: string,
  url?: string
}

const TitleWithDescription = (props: IProps) => {
  const { title, titleSize, content, style, id, url } = props;
  return (
    <div style={{ ...style, width: '100%' }} id={id}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: titleSize || 32, marginRight: 20 }}>{title}</div>
        {url && <a href={url} target="_blank" style={{ fontSize: 16, cursor: 'pointer' }}><LinkOutlined /></a>}
      </div>
      <div>{content}</div>
    </div>
  );
};
export default TitleWithDescription;
