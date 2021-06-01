/**
 * @description: 横向图片列表
 * @author: cnn
 * @createTime: 2020/9/10 20:10
 **/
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Row } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import HorizontalImageComponent from './HorizontalImageComponent';
import './imageListHorizontal.less';

export interface ImageData {
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
  propImageList: Array<ImageData>,
  onImageClick(image: ImageData, viewIndex: number): void,
  bottomImageListWidth: number,
  viewIndex: number,
  horizontalImageHeight: number
}

const ImageListHorizontal = (props: IProps) => {
  const { propImageList, bottomImageListWidth, onImageClick, viewIndex, horizontalImageHeight } = props;
  const arrowTop: number = horizontalImageHeight / 2 - 10;
  const imageListRef: any = useRef();
  const [isInit, setIsInit] = useState<boolean>(true);
  const [imageList, setImageList] = useState<Array<ImageData>>(propImageList);
  useEffect(() => {
    setIsInit(true);
    setImageList([...propImageList]);
  }, [propImageList]);
  // 初始化时懒加载
  useEffect(() => {
    if (isInit) {
      lazyLoad();
    }
  }, [imageList]);
  // 滑动至选择的图片
  useEffect(() => {
    if (bottomImageListWidth > 0 && imageList.length > viewIndex && viewIndex > -1) {
      toCurrentImage(imageList[viewIndex].leftPosition);
    }
  }, [bottomImageListWidth]);
  // 图片懒加载（预处理）
  const lazyLoad = () => {
    const tempImageList: Array<ImageData> = [...imageList];
    let maxWidth = 0;
    for (let i = 0; i < tempImageList.length; i++) {
      // 计算图片位置
      imageList[i].leftPosition = maxWidth;
      maxWidth = maxWidth + horizontalImageHeight / imageList[i].height * imageList[i].width + 16;
      // 懒加载
      if (document.getElementById('image-' + tempImageList[i].id) !== null) {
        // @ts-ignore
        let reactObj = document.getElementById('image-' + tempImageList[i].id).getBoundingClientRect();
        // div距顶部高度
        let contentLeft = reactObj.left;
        if (contentLeft < (250 + bottomImageListWidth)) {
          tempImageList[i].thumbnailTrueUrl = tempImageList[i].thumbnailUrl;
        }
      }
    }
    setImageList(tempImageList);
    setIsInit(false);
  };
  // 切换图片显示
  const changeCurrent = (image: ImageData, viewIndex: number) => {
    onImageClick(image, viewIndex);
    const rightPosition: number = image.leftPosition + image.width / image.height * horizontalImageHeight + 6;
    const scrollRight: number = imageListRef.current.scrollLeft + bottomImageListWidth;
    // 如果是没有显示完全的，则滑动
    if (rightPosition > scrollRight || image.leftPosition < imageListRef.current.scrollLeft) {
      toCurrentImage(image.leftPosition);
    }
  };
  // 获取下方显示的图片列表
  const getImageList = useMemo(() => {
    return imageList.map((image: ImageData, index: number) => (
      <div style={{ display: 'inline-block' }} id={'image-' + image.id} key={image.id}>
        <HorizontalImageComponent
          key={image.id}
          index={index}
          image={image}
          onClick={changeCurrent}
          height={horizontalImageHeight}
          width={image.width / image.height * horizontalImageHeight + 6}
          isActive={viewIndex === index}
          showBorder={true}
        />
      </div>
    ));
  }, [imageList, viewIndex]);
  // 去到该图片处
  const toCurrentImage = (position: number) => {
    if (imageListRef.current.scrollLeft < position) {
      toCurrentAnimation(imageListRef.current.scrollLeft, 'right', position);
    } else {
      toCurrentAnimation(imageListRef.current.scrollLeft, 'left', position);
    }
  };
  // 去到该图片处动画
  const toCurrentAnimation = (step: number, type: string, position: number) => {
    lazyLoad();
    const maxWidth: number = imageListRef.current.scrollWidth - bottomImageListWidth;
    imageListRef.current.scrollLeft = step;
    if (type === 'right' && step < position && step < maxWidth) {
      window.requestAnimationFrame(() => toCurrentAnimation(imageListRef.current.scrollLeft + 30, type, position));
    } else if (type === 'left' && step > position && step > 0) {
      window.requestAnimationFrame(() => toCurrentAnimation(imageListRef.current.scrollLeft - 30, type, position));
    }
  };
  return (
    <Row className="image-list-container">
      <CaretLeftOutlined
        className="left-list-arrow"
        style={{ top: arrowTop }}
        onClick={() => toCurrentImage(imageListRef.current.scrollLeft - bottomImageListWidth)}
      />
      <div
        ref={imageListRef}
        className="bottom-image-list-container"
        style={{ width: bottomImageListWidth, maxWidth: bottomImageListWidth, overflowX: 'auto', display: 'flex' }}
      >
        {getImageList}
      </div>
      <CaretRightOutlined
        className="right-list-arrow"
        style={{ top: arrowTop }}
        onClick={() => toCurrentImage(imageListRef.current.scrollLeft + bottomImageListWidth)}
      />
    </Row>
  );
};
export default ImageListHorizontal;
