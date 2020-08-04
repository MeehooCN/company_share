/**
 * @description: 标题
 * @author: cnn
 * @createTime: 2020/7/21 9:30
 **/
import React from 'react';

interface MyTitleProps {
  title: string,
  color?: string
}

const MyTitle = (props: MyTitleProps) => {
  let borderColor: string = '#333';
  const { title, color } = props;
  if (color) borderColor = color;
  return (
    <div style={{ padding: '0 0 0 18px', borderLeft: '4px solid ' + borderColor }}>
      {title}
    </div>
  );
};
export default MyTitle;
