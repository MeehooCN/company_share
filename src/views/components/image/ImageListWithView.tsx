/**
 * @description: 图片列表，点击看大图
 * @author: cnn
 * @createTime: 2021/6/1 15:30
 **/
import React, { useEffect } from 'react';
import { ImageListWithView as ImageListWithViewComponent, useImageListWithViewHook } from '@components/index';
import { ImageData } from '@components/components/image/ImageListHorizontal/ImageListHorizontal';
import { getClientWidth, throttle } from '@utils/CommonFunc';

const ImageListWithView = () => {
  const {
    imageList, setImageList, currentIndex, onImageClick, containerWidth,
    setContainerWidth, imageView, closeView, onHorImageClick
  } = useImageListWithViewHook(1000);
  useEffect(() => {
    setContainerWidth(getClientWidth() / 24 * 20 - 150);
    getImageList();
    window.addEventListener('resize', throttle(onWindowResize));
    return () => {
      window.removeEventListener('resize', throttle(onWindowResize));
    };
  }, []);
  // 监听窗口变化
  const onWindowResize = () => {
    setContainerWidth(getClientWidth() / 24 * 20 - 150);
  };
  // 获取图片列表
  const getImageList = () => {
    const tempImageList: Array<ImageData> = [{
      id: '1',
      thumbnailUrl: 'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnailTrueUrl: 'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sourceUrl: 'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'p1',
      width: 1688,
      height: 2250,
      leftPosition: 0
    }, {
      id: '2',
      thumbnailUrl: 'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnailTrueUrl: 'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sourceUrl: 'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'p2',
      width: 1125,
      height: 1500,
      leftPosition: 0
    }, {
      id: '3',
      thumbnailUrl: 'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnailTrueUrl: 'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sourceUrl: 'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'p3',
      width: 4608,
      height: 3072,
      leftPosition: 0
    }, {
      id: '4',
      thumbnailUrl: 'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnailTrueUrl: 'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sourceUrl: 'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'p4',
      width: 1000,
      height: 1500,
      leftPosition: 0
    }];
    const imageList: Array<ImageData> = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < tempImageList.length; j++) {
        imageList.push({
          ...tempImageList[j],
          id: tempImageList[j].id + '-' + i
        });
      }
    }
    setImageList(imageList);
  };
  return (
    <div>
      <ImageListWithViewComponent
        imageList={imageList}
        containerWidth={containerWidth}
        horizontalImageHeight={150}
        currentIndex={currentIndex}
        onImageClick={onImageClick}
        imageView={imageView}
        closeView={closeView}
        onHorImageClick={onHorImageClick}
      />
    </div>
  );
};
export default ImageListWithView;
