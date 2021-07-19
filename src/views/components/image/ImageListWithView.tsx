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
      thumbnailUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147588837&di=ffa801b9c9dc77d5d0b40e4db0b33331&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fce9f4aaaf1b253030e7b9ba2e6c14dc45320b5f2.jpg',
      name: 'p3',
      width: 2300,
      height: 1326,
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
