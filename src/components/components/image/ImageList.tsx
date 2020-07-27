/**
 * @description: 图片列表
 * @author: cnn
 * @createTime: 2020/7/27 11:27
 * @param: imageList: 图片列表数据，listChange: 是否改变图片列表，containerWidth: 容器宽度
 **/
/* eslint no-unused-vars:0 */
import React from 'react';
import { Empty, Row } from 'antd';
import { ImageComponent } from '@components/index';
import { ImageData } from '@utils/CommonInterface';

// 图片列表容器宽度
const wishHeight: number = 200;

interface ImageDataWithViewContainer extends ImageData {
  viewWidth: number,
  viewHeight: number,
  imageRatio: number
}

interface IProps {
  imageList: Array<ImageData>,
  listChange?: boolean,
  containerWidth?: number
}
interface IState {
  imageList: Array<ImageDataWithViewContainer>,
  containerWidth: number
}

class ImageList extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    imageList: [],
    containerWidth: 1200
  };
  componentDidMount(): void {
    const { imageList, containerWidth } = this.props;
    this.setState({ imageList: this.getImageList(imageList), containerWidth: containerWidth || 1200 }, () => {
      this.lazyLoad();
      this.getImageView();
    });
  }
  componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
    const { imageList, listChange } = nextProps;
    if (listChange) {
      this.setState({ imageList: this.getImageList(imageList) }, () => {
        this.lazyLoad();
        this.getImageView();
      });
    } else {
      if (this.props.imageList !== nextProps.imageList) {
        this.setState({ imageList: this.getImageList(imageList) }, () => {
          this.lazyLoad();
          this.getImageView();
        });
      }
    }
  }
  // 获取图片列表
  private getImageList = (imageList: Array<ImageData>) => {
    return imageList.map((item: ImageData) => {
      return {
        ...item,
        viewHeight: wishHeight,
        viewWidth: wishHeight,
        imageRatio: item.width / item.height
      };
    });
  };
  // 计算图片宽高
  private getImageView = () => {
    const { imageList, containerWidth } = this.state;
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
    for (let index: number = 0; index < imageList.length; index++) {
      rowTotalRatio = rowTotalRatio + imageList[index].imageRatio;
      // 分行，每行宽高比总和小于总宽高比
      if (rowTotalRatio >= allRatio) {
        const spaceWidth: number = rowTotal * 10;
        const restWidth = containerWidth - spaceWidth;
        const height: number = restWidth / (rowTotalRatio - imageList[index].imageRatio);
        rowList.push({
          row: rowIndex,
          endIndex: index - 1, // 包括这张图
          total: rowTotal,
          height
        });
        lastRowIndex = index - 1;
        rowIndex = rowIndex + 1;
        rowTotalRatio = imageList[index].imageRatio;
        rowTotal = 1;
      } else {
        rowTotal = rowTotal + 1;
      }
    }
    // 如果还剩图片或者只有一行
    if (lastRowIndex < (imageList.length - 1) || lastRowIndex === 0) {
      rowList.push({
        row: rowIndex,
        endIndex: imageList.length - 1,
        total: imageList.length - lastRowIndex,
        height: wishHeight
      });
    }
    for (let j: number = 0; j < rowList.length; j++) {
      let startIndex: number = -1; // 不包括
      let endIndex: number = rowList[j].endIndex; // 包括
      if (j > 0) {
        startIndex = rowList[j - 1].endIndex;
      }
      for (let i: number = 0; i < imageList.length; i++) {
        // 如果图片处于这一行
        if (i > startIndex && i <= endIndex) {
          imageList[i].viewHeight = rowList[j].height;
          imageList[i].viewWidth = imageList[i].imageRatio * imageList[i].viewHeight;
        }
      }
    }
    this.setState({ imageList });
  };
  // 图片懒加载
  private lazyLoad = () => {
    const { imageList } = this.state;
    // 设备可用高度
    let availHeight: number = window.screen.availHeight;
    // 滚动的高度
    let scrollHeight: number = document.documentElement.scrollTop;
    // 距img元素显露出的距离
    // 有个问题，最后两个始终处于懒加载下面一排不知道为啥
    let diff = 100;
    for (let i = 0; i < imageList.length; i++) {
      let imgDiv = imageList[i].id;
      // @ts-ignore
      let reactObj = document.getElementById(imgDiv).getBoundingClientRect();
      // div距顶部高度
      let contentTop = reactObj.top;
      if (scrollHeight + diff > contentTop - availHeight) {
        imageList[i].thumbnailTrueUrl = imageList[i].thumbnailUrl;
      }
    }
    this.setState({ imageList });
  };
  // 滑动滚轮图片懒加载
  private handleWheel = (e: any) => {
    let deltaY = e.deltaY;
    // 向下 加载图片
    if (deltaY > 0) {
      this.lazyLoad();
    }
  };

  render(): React.ReactNode {
    const { imageList, containerWidth } = this.state;
    let imageHtml: any = <Row justify="center" style={{ width: '100%' }}><Empty description="暂无图片" /></Row>;
    if (imageList.length > 0) {
      imageHtml = imageList.map((item: ImageDataWithViewContainer, index: number) => (
        <div id={item.id} key={item.id}>
          <ImageComponent
            index={index}
            image={item}
            imageList={imageList}
            height={item.viewHeight}
            width={item.viewWidth}
          />
        </div>
      ));
    }
    return (
      <div
        style={{
          width: containerWidth + 1,
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: containerWidth + 1
        }}
        onWheel={this.handleWheel}
      >
        {imageHtml}
      </div>
    );
  }
}
export default ImageList;
