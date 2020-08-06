/**
 * @description: 图片组件
 * @author: cnn
 * @createTime: 2020/7/27 16:28
 **/
import React from 'react';
import { ImageData } from '@utils/CommonInterface';

interface IProps {
  index: number,
  image: ImageData,
  height?: number,
  width?: number,
  onClick(image: ImageData): void
}

const ImageComponent = (props: IProps) => {
  const { image, height, width, onClick } = props;
  return (
    <div style={{ height: height || 150, width: width || undefined, margin: 5, cursor: 'pointer' }} onClick={() => onClick(image)}>
      <img src={image.thumbnailTrueUrl} alt={image.name} style={{ height: height || 150, width: 'auto' }} />
    </div>
  );
};

export default ImageComponent;
