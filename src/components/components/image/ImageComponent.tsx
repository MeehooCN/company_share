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
  imageList: Array<ImageData>,
  height: number,
  width: number
}

interface IState {}

class ImageComponent extends React.Component<IProps, IState> {
  render(): React.ReactNode {
    const { image, height, width } = this.props;
    return (
      <div style={{ height: height, width: width, margin: 5 }}>
        <img src={image.thumbnailTrueUrl} alt={image.name} style={{ height: height, width: 'auto' }} />
      </div>
    );
  }
}

export default ImageComponent;
