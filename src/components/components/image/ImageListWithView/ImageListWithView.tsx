/**
 * @description: 图片列表，点击看大图
 * @author: cnn
 * @createTime: 2021/6/1 15:32
 **/
import React, { useState } from 'react';
import { Row } from 'antd';
import ImageList from './ImageList';
import View from './View';

interface ImageData {
  id: string,
  sourceUrl: string,
  thumbnailUrl: string,
  thumbnailTrueUrl: string,
  name: string,
  width: number,
  height: number
  leftPosition: number
}

interface IProps {
  containerWidth: number,
  horizontalImageHeight?: number,
  imageList: Array<ImageData>,
  currentIndex: number,
  onImageClick(image: ImageData, viewIndex: number): void,
  onHorImageClick(image: ImageData, viewIndex: number): void,
  imageView: boolean,
  closeView: () => void,
  parentId?: string, // 父容器 id
  parentTop?: number // 父容器距浏览器顶部距离
}

// 使用该组件 hook
export const useImageListWithViewHook = (initWidth: number) => {
  const [containerWidth, setContainerWidth] = useState<number>(initWidth);
  const [imageList, setImageList] = useState<Array<ImageData>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [imageView, setImageView] = useState<boolean>(false);
  // 列表点击图片
  const onImageClick = (image: ImageData, viewIndex: number) => {
    // 隐藏滚动条
    document.documentElement.style.overflow = 'hidden';
    setCurrentIndex(viewIndex);
    setImageView(true);
  };
  // 横向列表点击图片
  const onHorImageClick = (image: ImageData, viewIndex: number) => {
    setCurrentIndex(viewIndex);
  };
  // 关闭图片显示
  const closeView = () => {
    setImageView(false);
  };
  return {
    containerWidth, setContainerWidth, imageList, setImageList, currentIndex,
    setCurrentIndex, onImageClick, imageView, closeView, onHorImageClick
  };
};

const ImageListWithView = (props: IProps) => {
  const {
    imageList, containerWidth, onImageClick, imageView, currentIndex,
    closeView, onHorImageClick, horizontalImageHeight, parentId, parentTop
  } = props;
  return (
    <Row>
      <ImageList
        imagePropList={imageList}
        containerWidth={containerWidth}
        onImageClick={onImageClick}
        parentId={parentId}
        parentTop={parentTop}
      />
      <View
        imageView={imageView}
        currentIndex={currentIndex}
        imageList={imageList}
        closeView={closeView}
        onHorImageClick={onHorImageClick}
        horizontalImageHeight={horizontalImageHeight || 150}
      />
    </Row>
  );
};
export default ImageListWithView;
