/**
 * @description: 居中显示加载效果
 * @author: cnn
 * @createTime: 2020/8/17 13:41
 **/
import React from 'react';
import { Spin } from 'antd';

/**
 * loading: 当前是否加载中
 * height: 加载容器高度，默认 100
 * **/
interface IProps {
  loading: boolean,
  height?: number
}

const Loading = (props: IProps) => {
  const { loading, height } = props;
  return (
    <div
      style={{
        width: '100%',
        height: height || 100,
        display: loading ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Spin spinning={loading} />
    </div>
  );
};
export default Loading;
