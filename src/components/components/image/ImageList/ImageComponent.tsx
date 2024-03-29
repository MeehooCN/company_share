/**
 * @description: 图片组件
 * @author: cnn
 * @createTime: 2020/7/27 16:28
 **/
import React from 'react';

export interface ImageData {
  id: string,
  sourceUrl: string,
  thumbnailUrl: string,
  name: string,
  width: number,
  height: number
}

interface IProps {
  index: number,
  image: ImageData,
  height?: number,
  width?: number,
  onClick(image: ImageData, viewIndex: number): void,
  isBigWidth?: boolean,
  borderColor?: string
}

const ImageComponent = (props: IProps) => {
  const { image, height, width, onClick, index, isBigWidth, borderColor } = props;
  return (
    <div
      style={{
        height: height || 150,
        width: width || undefined,
        margin: 5,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: isBigWidth ? '1px solid ' + borderColor : 'none'
      }}
      onClick={() => onClick(image, index)}
    >
      {isBigWidth ? (
        <img src={image.thumbnailUrl} alt={image.name} style={{ width: '100%' }} loading="lazy" />
      ) : (
        <img src={image.thumbnailUrl} alt={image.name} style={{ height: height || 150, width: 'auto' }} loading="lazy" />
      )}
    </div>
  );
};

export default ImageComponent;
