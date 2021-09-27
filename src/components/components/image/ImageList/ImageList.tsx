/**
 * @description: 图片列表
 * @author: cnn
 * @createTime: 2020/7/27 11:27
 * @param: imageList: 图片列表数据，containerWidth: 容器宽度
 **/
import React, { useState, useEffect } from 'react';
import { Empty, Row } from 'antd';
import { default as ImageComponent, ImageData } from './ImageComponent';

// 图片列表每张图期望高度
const wishHeight: number = 200;

interface ImageDataWithViewContainer extends ImageData {
  viewWidth: number,
  viewHeight: number,
  imageRatio: number,
  isBigWidth?: boolean
}

interface IProps {
  imagePropList: Array<ImageData>,
  containerWidth?: number,
  onImageClick?(image: ImageData, viewIndex: number): void,
  parentId?: string, // 父容器 id
  parentTop?: number
}

// 使用该组件的 hook
export const useImageListHook = (containerInitWidth?: number) => {
  const [imagePropList, setImagePropList] = useState<Array<ImageData>>([]);
  const [containerWidth, setContainerWidth] = useState<number>(containerInitWidth || 1200);
  return { imagePropList, setImagePropList, containerWidth, setContainerWidth };
};

const ImageList = (props: IProps) => {
  const { imagePropList, containerWidth = 1200, onImageClick, parentId, parentTop = 0 } = props;
  const [imageList, setImageList] = useState<Array<ImageDataWithViewContainer>>([]);
  const [isInit, setIsInit] = useState<boolean>(false);
  useEffect(() => {
    const parentDom = parentId ? (document.getElementById(parentId) || window) : window;
    parentDom.addEventListener('scroll', handleWheel);
    return () => {
      parentDom.removeEventListener('scroll', handleWheel);
    };
  }, [imageList]);
  useEffect(() => {
    setIsInit(true);
    initImageList(imagePropList);
  }, [imagePropList, containerWidth]);
  useEffect(() => {
    if (isInit) {
      lazyLoad();
    }
  }, [imageList]);
  // 初始化图片列表
  const initImageList = (imagePropList: Array<ImageData>) => {
    if (imagePropList.length > 0) {
      const allRatio: number = containerWidth / wishHeight;
      let imageTempList: Array<ImageDataWithViewContainer> = imagePropList.map((item: ImageData) => {
        // 优化宽图显示
        const imageRatio: number = item.width / item.height;
        return {
          ...item,
          viewHeight: wishHeight,
          viewWidth: wishHeight,
          imageRatio: imageRatio < allRatio ? imageRatio : (16 / 9),
          isBigWidth: imageRatio > allRatio
        };
      });
      imageTempList = getImageView(imageTempList);
      setImageList(imageTempList);
    } else {
      setImageList([]);
    }
  };
  let lastScrollTop: number = -1;
  // 滑动滚轮图片懒加载
  const handleWheel = (e: any) => {
    if (parentId) {
      // 向下滚动
      if (e.target.scrollTop > lastScrollTop) {
        // 向下加载图片
        lazyLoad();
        lastScrollTop = e.target.scrollTop;
      }
    } else {
      if (window.scrollY > lastScrollTop) {
        // 向下加载图片
        lazyLoad();
        lastScrollTop = window.scrollY;
      }
    }
  };
  // 图片懒加载
  const lazyLoad = () => {
    const tempImageList: Array<ImageDataWithViewContainer> = [...imageList];
    if (tempImageList.length > 0) {
      // 设备可用高度
      let availHeight: number = window.screen.availHeight;
      // 滚动的高度
      let scrollHeight: number = document.documentElement.scrollTop;
      // 距 img 元素显露出的距离
      let diff = 100 + parentTop;
      for (let i = 0; i < tempImageList.length; i++) {
        // @ts-ignore
        let reactObj = document.getElementById(tempImageList[i].id).getBoundingClientRect();
        // div距顶部高度
        let contentTop = reactObj.top; // 1080
        if (scrollHeight + diff > contentTop - availHeight) {
          tempImageList[i].thumbnailTrueUrl = tempImageList[i].thumbnailUrl;
        }
      }
      setImageList(tempImageList);
      setIsInit(false);
    }
  };
  // 计算图片宽高
  const getImageView = (imageTempList: Array<ImageDataWithViewContainer>) => {
    const allRatio: number = containerWidth / wishHeight;
    let rowList: Array<any> = [];
    // 第几行
    let rowIndex: number = 1;
    // 当前行所有宽高比之和
    let rowTotalRatio: number = 0;
    // 最后铺满的一排的最后一个的 index
    let lastRowIndex: number = 0;
    // 当前行有几张图
    let rowTotal: number = 0;
    for (let index: number = 0; index < imageTempList.length; index++) {
      rowTotalRatio = rowTotalRatio + imageTempList[index].imageRatio;
      // 分行，每行宽高比总和小于总宽高比
      // 当当前宽高比大于总宽高比时，说明应该是下一行了，当前的上一行为最后一个
      if (rowTotalRatio > allRatio) {
        const spaceWidth: number = rowTotal * 10;
        const restWidth = containerWidth - spaceWidth;
        const height: number = restWidth / (rowTotalRatio - imageTempList[index].imageRatio);
        rowList.push({
          row: rowIndex,
          endIndex: index - 1, // 包括这张图
          height
        });
        lastRowIndex = index - 1;
        rowIndex = rowIndex + 1;
        rowTotalRatio = imageTempList[index].imageRatio;
        rowTotal = 1;
      } else {
        rowTotal = rowTotal + 1;
      }
    }
    // 如果还剩图片或者只有一行
    if (lastRowIndex < (imageTempList.length - 1) || lastRowIndex === 0) {
      rowList.push({
        row: rowIndex,
        endIndex: imageTempList.length - 1,
        height: wishHeight - 10
      });
    }
    for (let j: number = 0; j < rowList.length; j++) {
      let startIndex: number = -1; // 不包括
      let endIndex: number = rowList[j].endIndex; // 包括
      if (j > 0) {
        startIndex = rowList[j - 1].endIndex;
      }
      for (let i: number = 0; i < imageTempList.length; i++) {
        // 如果图片处于这一行
        if (i > startIndex && i <= endIndex) {
          imageTempList[i].viewHeight = rowList[j].height;
          imageTempList[i].viewWidth = imageTempList[i].imageRatio * imageTempList[i].viewHeight;
        }
      }
    }
    return imageTempList;
  };
  // 获取图片列表显示
  const getImageListView = () => {
    let imageHtml: any = <Row justify="center" style={{ width: '100%' }}><Empty description="暂无图片" /></Row>;
    if (imageList.length > 0) {
      imageHtml = imageList.map((item: ImageDataWithViewContainer, index: number) => (
        <div id={item.id} key={item.id}>
          <ImageComponent
            index={index}
            image={item}
            height={item.viewHeight}
            width={item.viewWidth}
            onClick={onImageClick ? onImageClick : () => {}}
            isBigWidth={item.isBigWidth}
          />
        </div>
      ));
    }
    return imageHtml;
  };
  return (
    <div
      style={{
        width: containerWidth,
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: containerWidth + 1
      }}
    >
      {getImageListView()}
    </div>
  );
};
export default ImageList;
