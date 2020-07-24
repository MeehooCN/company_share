/**
 * @description: 组件页面的标题和描述
 * @author: cnn
 * @createTime: 2020/7/21 10:32
 **/
/* eslint no-unused-vars:0 */
import React, { CSSProperties } from 'react';

interface IProps {
  title: string,
  titleSize?: number,
  content: string,
  style?: CSSProperties,
  id?: string
}

const TitleWithDescription = (props: IProps) => {
  const { title, titleSize, content, style, id } = props;
  return (
    <div style={{ ...style, width: '100%' }} id={id}>
      <div style={{ fontSize: titleSize || 32 }}>{title}</div>
      <div>{content}</div>
    </div>
  );
};
export default TitleWithDescription;
