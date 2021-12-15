/**
 * @description: 消息通知
 * @author: cnn
 * @createTime: 2021/12/14 15:57
 **/
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * msg: 提示文字
 * type: 提示类型
 * duration: 显示持续时间，默认 3 秒
**/
export const message = (msg: string, type: 'warning' | 'error' | 'success', duration: number = 3) => {
  const child = document.createElement('div');
  ReactDOM.render(<Message type={type} msg={msg} />, child);
  document.body.appendChild(child);
  setTimeout(() => {
    document.body.removeChild(child);
  }, duration * 1000);
};

interface IProps {
  msg: string,
  type: 'warning' | 'error' | 'success',
}
const Message = (props: IProps) => {
  const { msg, type = 'success' } = props;
  // 获取背景和字体颜色
  const getColorStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'rgba(0, 255, 0, 0.9)',
          border: '1px solid rgba(0, 255, 0, 1)'
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(255, 100, 20, 0.9)',
          border: '1px solid rgba(255, 100, 20, 1)'
        };
      case 'error':
        return {
          backgroundColor: 'rgba(255, 0, 0, 0.9)',
          border: '1px solid rgba(255, 0, 0, 1)'
        };
    }
  };
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        left: 0,
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...getColorStyle(),
          borderRadius: 4,
          color: '#fff',
          padding: '5px 10px'
        }}
      >
        {msg}
      </div>
    </div>
  );
};
export default Message;
