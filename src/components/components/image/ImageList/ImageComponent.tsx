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
  onClick(image: ImageData, viewIndex: number): void,
  isBigWidth?: boolean
}

const ImageComponent = (props: IProps) => {
  const { image, height, width, onClick, index, isBigWidth } = props;
  return (
    <div
      style={{
        height: height || 150,
        width: width || undefined,
        margin: 5,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={() => onClick(image, index)}
    >
      {isBigWidth ? (
        <img src={image.thumbnailTrueUrl} alt={image.name} style={{ width: '100%' }} />
      ) : (
        <img src={image.thumbnailTrueUrl} alt={image.name} style={{ height: height || 150, width: 'auto' }} />
      )}
    </div>
  );
};

export default ImageComponent;
