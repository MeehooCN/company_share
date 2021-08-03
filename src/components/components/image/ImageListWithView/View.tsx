/**
 * @description: 查看图片，上面是可放大的图，下面是横向滚动列表
 * @author: cnn
 * @createTime: 2021/6/1 15:51
 **/
import React from 'react';
import ImageView from './ImageView';

interface ImageData {
  id: string,
  sourceUrl: string,
  thumbnailUrl: string,
  thumbnailTrueUrl: string,
  name: string,
  width: number,
  height: number,
  leftPosition: number
}

interface IProps {
  imageView: boolean,
  imageList: Array<ImageData>,
  currentIndex: number,
  closeView: () => void,
  onHorImageClick(image: ImageData, viewIndex: number): void,
  horizontalImageHeight: number
}

const View = (props: IProps) => {
  const { imageView, imageList, currentIndex, closeView, onHorImageClick, horizontalImageHeight } = props;
  return (
    <ImageView
      index={currentIndex}
      imageList={imageList}
      closeView={closeView}
      imageView={imageView}
      onHorImageClick={onHorImageClick}
      horizontalImageHeight={horizontalImageHeight}
    />
  );
};
export default View;
