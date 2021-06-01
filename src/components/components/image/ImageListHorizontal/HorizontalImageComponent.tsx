/**
 * @description: 图片组件
 * @author: cnn
 * @createTime: 2020/7/27 16:28
 **/
import React from 'react';
import { colors } from '@utils/CommonVars';
import './horizontalImageComponent.less';

interface ImageData {
  id: string,
  sourceUrl: string,
  thumbnailUrl: string,
  thumbnailTrueUrl: string,
  name: string,
  width: number,
  height: number
}

interface IProps {
  index: number,
  image: ImageData,
  height?: number,
  width?: number,
  onClick(image: ImageData, index: number): void,
  showBorder?: boolean,
  isActive?: boolean,
}

const HorizontalImageComponent = (props: IProps) => {
  const { image, height, width, onClick, index, isActive, showBorder } = props;
  // 获取高度
  const getHeight = () => {
    if (showBorder && height) {
      return height + 6;
    } else if (height) {
      return height;
    } else {
      return 150;
    }
  };
  // 选择图片
  const selectImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(image, index);
    }
  };
  return (
    <div
      className="image-container"
      style={{
        height: getHeight(),
        width: width || undefined,
        border: showBorder ? '3px solid ' + (isActive ? colors.primaryColor : '#fff') : 'none'
      }}
      onClick={(event: any) => selectImage(event)}
    >
      <img src={image.thumbnailTrueUrl} alt={image.name} style={{ height: height || 150, width: 'auto' }} />
    </div>
  );
};

export default HorizontalImageComponent;
