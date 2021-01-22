/**
 * @description: 图片列表
 * @author: cnn
 * @createTime: 2020/7/27 11:27
 * @param: imageList: 图片列表数据，listChange: 是否改变图片列表，containerWidth: 容器宽度
 **/
import React, { useState, useEffect } from 'react';
import { Empty, Row } from 'antd';
import { ImageComponent } from '@components/index';
import { ImageData } from '@utils/CommonInterface';

// 图片列表每张图期望高度
const wishHeight: number = 200;

interface ImageDataWithViewContainer extends ImageData {
  viewWidth: number,
  viewHeight: number,
  imageRatio: number
}

interface IProps {
  imagePropList: Array<ImageData>,
  listChange?: boolean,
  containerWidth?: number
}

const ImageList = (props: IProps) => {
  const { imagePropList, containerWidth = 1200 } = props;
  const [imageList, setImageList] = useState<Array<ImageDataWithViewContainer>>([]);
  const [isInit, setIsInit] = useState<boolean>(false);
  useEffect(() => {
    setIsInit(true);
    initImageList(imagePropList);
  }, [imagePropList]);
  useEffect(() => {
    if (isInit) {
      lazyLoad();
    }
  }, [imageList]);
  // 初始化图片列表
  const initImageList = (imagePropList: Array<ImageData>) => {
    if (imagePropList.length > 0) {
      let imageTempList: Array<ImageDataWithViewContainer> = imagePropList.map((item: ImageData) => {
        return {
          ...item,
          viewHeight: wishHeight,
          viewWidth: wishHeight,
          imageRatio: item.width / item.height
        };
      });
      imageTempList = getImageView(imageTempList);
      setImageList(imageTempList);
    } else {
      setImageList([]);
    }
  };
  // 滑动滚轮图片懒加载
  const handleWheel = (e: any) => {
    let deltaY = e.deltaY;
    // 向下 加载图片
    if (deltaY > 0) {
      lazyLoad();
    }
  };
  // 图片懒加载
  const lazyLoad = () => {
    const tempImageList: Array<ImageDataWithViewContainer> = [...imageList];
    // 设备可用高度
    let availHeight: number = window.screen.availHeight;
    // 滚动的高度
    let scrollHeight: number = document.documentElement.scrollTop;
    // 距img元素显露出的距离
    // 有个问题，最后两个始终处于懒加载下面一排不知道为啥
    let diff = 100;
    for (let i = 0; i < tempImageList.length; i++) {
      // @ts-ignore
      let reactObj = document.getElementById(tempImageList[i].id).getBoundingClientRect();
      // div距顶部高度
      let contentTop = reactObj.top;
      if (scrollHeight + diff > contentTop - availHeight) {
        tempImageList[i].thumbnailTrueUrl = tempImageList[i].thumbnailUrl;
      }
    }
    setImageList(tempImageList);
    setIsInit(false);
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
  let imageHtml: any = <Row justify="center" style={{ width: '100%' }}><Empty description="暂无图片" /></Row>;
  if (imageList.length > 0) {
    imageHtml = imageList.map((item: ImageDataWithViewContainer, index: number) => (
      <div id={item.id} key={item.id}>
        <ImageComponent
          index={index}
          image={item}
          height={item.viewHeight}
          width={item.viewWidth}
          onClick={() => {}}
        />
      </div>
    ));
  }
  return (
    <div
      style={{
        width: containerWidth,
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: containerWidth + 1
      }}
      onWheel={handleWheel}
    >
      {imageHtml}
    </div>
  );
};
export default ImageList;
