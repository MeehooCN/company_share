/**
 * @description: 可移动伸缩窗口
 * @author: lll
 * @createTime: 2021/7/28
 **/
import React, { useState } from 'react';
import { Button, Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { createPortal } from 'react-dom';
import Rnd from 'react-rnd';

interface IProps {
  moveTitle: string,
  minWidth: number,
  minHeight: number
}
const MoveWindow = (props: IProps) => {
  const { moveTitle, minWidth, minHeight } = props;
  const [rndSize, setRndSize] = useState<[number, number]>([0, 0]); // 0、width，1、height
  const [rndPosition, setRndPosition] = useState<[number, number]>([0, 0]); // 0、x轴坐标，1、y轴坐标(以左上角为)
  const [moveVisible, setMoveVisible] = useState<boolean>(false);
  // 关闭移动窗口
  const closeMoveWindow = () => {
    setMoveVisible(false);
    // 设置移动窗口的宽高为0
    setRndSize([0, 0]);
    // 设置移动窗口的位置为[0,0]
    setRndPosition([0, 0]);
  };
  const rnd = (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }}
      style={{ zIndex: 1001 }}
      bounds="body"
      minWidth={moveVisible ? minWidth : 0}
      minHeight={moveVisible ? minHeight : 0}
      size={{ width: rndSize[0], height: rndSize[1] }}
      position={{ x: rndPosition[0], y: rndPosition[1] }}
      onDragStop={(e, d) => setRndPosition([d.x, d.y])}
      onResizeStop={(e, direction, ref, delta, position) => {
        setRndSize([Number(ref.style.width), Number(ref.style.height)]);
        setRndPosition([position.x, position.y]);
      }}
    >
      <div
        style={{
          display: moveVisible ? 'block' : 'none',
          height: '100%',
          width: '100%',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: 5,
          cursor: 'move'
        }}
      >
        <Row justify="space-between" align="middle" style={{ padding: '10px 0', fontSize: 16, borderBottom: '1px solid #F0F0F0', marginBottom: 20 }}>
          <span style={{ marginLeft: 20 }}>{moveTitle}</span>
          <CloseOutlined style={{ marginRight: 20 }} onClick={closeMoveWindow} />
        </Row>
        <Row>
          内容区域(放入你需要展示的内容：建议以组件形式导入)
        </Row>
      </div>
    </Rnd>
  );
  // 获取挂载移动窗口的根节点
  const domRoot = document.getElementById('app') || document.body;
  return (
    <>
      <Button type="link" onClick={() => setMoveVisible(true)}>{moveTitle}</Button>
      {createPortal(rnd, domRoot)}
    </>
  );
};
export default MoveWindow;