/**
 * @description: 图片浏览
 * @author: cnn
 * @params: index: 浏览的图片位于当前图片列表第几张，imageView: 是否显示图片浏览窗口，imageList: 图片列表, closeView: 关闭图片显示回调函数
 * @createTime: 2020/8/3 11:01
 **/
import React from 'react';
import { createPortal } from 'react-dom';
import { Row, Space, Spin } from 'antd';
import { CloseOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import './imageView.less';
import ImageListHorizontal from './ImageListHorizontal';

const clientHeight: number = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 170;
const clientWidth: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// 最大放大倍数
const maxScale: number = 10;
// 最小缩放倍数
const minScale: number = 0.5;

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
  index: number,
  imageView: boolean,
  imageList: Array<ImageData>,
  closeView(): void,
  onHorImageClick(image: ImageData, viewIndex: number): void,
  horizontalImageHeight: number
}

interface IState {
  originWidth: number,
  originHeight: number,
  showWidth: number,
  showHeight: number,
  viewImage: ImageData,
  viewIndex: number,
  canDragImage: boolean,
  startX: number,
  startY: number,
  moveX: number,
  moveY: number,
  imageView: boolean,
  imageLoading: boolean
}

class ImageView extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    const document = window.document;
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }
  public readonly state: Readonly<IState> = {
    originWidth: 0,
    originHeight: 0,
    showWidth: 0,
    showHeight: 0,
    viewImage: {
      id: '0',
      thumbnailUrl: '',
      thumbnailTrueUrl: '',
      sourceUrl: '',
      name: '',
      width: 0,
      height: 0,
      leftPosition: 0
    },
    viewIndex: this.props.index,
    canDragImage: false,
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    imageView: this.props.imageView,
    imageLoading: false,
  };
  componentDidMount(): void {
    const { imageList, index } = this.props;
    // 设置查看图片时图片的宽高
    if (index >= 0 && imageList.length > 0) {
      this.setState({ viewImage: imageList[index], viewIndex: index }, this.setImageSize);
    }
  }
  componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
    const { imageView, imageList, index } = nextProps;
    this.setState({ imageView });
    if (index >= 0 && this.props.index !== index) {
      this.setState({ viewImage: imageList[index], viewIndex: index }, this.setImageSize);
    }
  }
  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
  private readonly node: any;
  // 设置查看图片时图片的宽高
  private setImageSize = () => {
    const { viewImage } = this.state;
    this.setState({ imageLoading: true });
    const image = new Image();
    image.src = viewImage.sourceUrl;
    image.onload = () => {
      viewImage.width = image.width;
      viewImage.height = image.height;
      let showWidth: number = 0;
      let showHeight: number = 0;
      // 如果图片宽高任一超过浏览器
      if (viewImage.width > clientWidth || viewImage.height > clientHeight) {
        const ratio = viewImage.width / viewImage.height;
        const widthRatio = viewImage.width / clientWidth;
        const heightRatio = viewImage.height / clientHeight;
        // 如果图片宽度和浏览器差距更大
        if (widthRatio > heightRatio) {
          showWidth = clientWidth;
          showHeight = showWidth / ratio;
        } else {
          showHeight = clientHeight;
          showWidth = showHeight * ratio;
        }
      }
      // 两者皆小于
      else {
        // 保持原图大小
        showWidth = viewImage.width;
        showHeight = viewImage.height;
      }
      this.setState({
        showWidth,
        showHeight,
        originWidth: showWidth,
        originHeight: showHeight,
        imageLoading: false
      });
    };
    image.onerror = () => {
      this.setState({
        imageLoading: false
      });
    };
  };
  // 取消查看图片
  private hiddenImage = () => {
    const { closeView } = this.props;
    // 显示滚动条
    // @ts-ignore
    document.documentElement.style.overflow = 'auto';
    closeView();
    this.setState({
      imageView: false,
      moveX: 0,
      moveY: 0,
      startX: 0,
      startY: 0,
      canDragImage: false
    }, this.setImageSize);
  };
  // 监听鼠标滚轮，放大缩小图片
  private changeImageSize = (e: any) => {
    const { viewImage, showWidth, showHeight, originWidth } = this.state;
    let deltaY = e.deltaY;
    // 向下 缩小图片
    if (deltaY > 0) {
      // 判断是否超过最小缩放倍数，超过则不可缩小
      if ((showWidth / originWidth) > minScale) {
        // 如果大于浏览器宽高则可以拖动
        if (showWidth > clientWidth || showHeight > clientHeight) {
          this.setState({
            showHeight: showHeight * 0.8,
            showWidth: showWidth * 0.8,
            canDragImage: true
          });
        } else {
          this.setState({
            showHeight: showHeight * 0.8,
            showWidth: showWidth * 0.8,
            canDragImage: false
          });
        }
      }
    }
    // 向上 放大图片
    else if (deltaY < 0) {
      // 判断是否超过最大放大倍数，超过则不可以再放大
      if ((showWidth / originWidth) < maxScale) {
        if (showWidth * 1.2 < viewImage.width && showHeight * 1.2 < viewImage.height) {
          // 如果大于浏览器宽高则可以拖动
          if (showWidth > clientWidth || showHeight > clientHeight) {
            this.setState({
              showHeight: showHeight * 1.2,
              showWidth: showWidth * 1.2,
              canDragImage: true
            });
          } else {
            this.setState({
              showHeight: showHeight * 1.2,
              showWidth: showWidth * 1.2,
              canDragImage: false
            });
          }
        }
      }
    }
  };
  // 开始拖动图片
  private handleDragStart = (e: any) => {
    const { showWidth, showHeight, startX, startY } = this.state;
    // 如果大于浏览器宽高则可以拖动
    if (showWidth > clientWidth || showHeight > clientHeight) {
      this.setState({
        canDragImage: true,
        startX: e.clientX - startX,
        startY: e.clientY - startY
      });
    } else {
      this.setState({
        canDragImage: false,
        startX: e.clientX - startX,
        startY: e.clientY - startY
      });
    }
  };
  // 正在拖动图片
  private handleImageDrag = (e: any) => {
    const { canDragImage, startX, startY } = this.state;
    if (canDragImage) {
      if (e.clientX % 5) {
        // 防抖动
        const newMoveX: number = e.clientX - startX;
        const newMoveY: number = e.clientY - startY;
        this.setState({ moveX: newMoveX, moveY: newMoveY });
      }
    }
  };
  // 停止拖动
  private handleDragEnd = () => {
    const { moveX, moveY } = this.state;
    this.setState({ startX: moveX, startY: moveY });
  };
  // 图片居中
  private centerImage = () => {
    this.setState({ moveX: 0, moveY: 0, startX: 0, startY: 0 }, this.setImageSize);
  };
  render(): React.ReactNode {
    const {
      showWidth, showHeight, viewImage, moveX,
      moveY, imageView, imageLoading, canDragImage,
    } = this.state;
    const { imageList, onHorImageClick, index, horizontalImageHeight } = this.props;
    return createPortal(
      (
        <div
          className="view-container"
          style={{ display: imageView ? 'block' : 'none' }}
          onWheel={this.changeImageSize}
          onDragEnter={(e: any) => e.preventDefault()}
          onDragOver={(e: any) => e.preventDefault()}
        >
          <div className="view-hor-image-container" style={{ height: 'calc(100vh - ' + (horizontalImageHeight + 20) + 'px)' }}>
            <Row className="top-icon-container">
              <Space size="middle">
                <FullscreenExitOutlined className="center-icon" title="居中" onClick={this.centerImage} />
                <CloseOutlined className="close-icon" title="退出" onClick={this.hiddenImage} />
              </Space>
            </Row>
            <Spin spinning={imageLoading}>
              <img
                src={viewImage.sourceUrl}
                alt={viewImage.name}
                style={{
                  width: showWidth,
                  height: showHeight,
                  transitionProperty: 'width, height',
                  transitionDuration: '0.3s',
                  position: 'relative',
                  top: moveY,
                  left: moveX,
                  cursor: canDragImage ? 'move' : 'default'
                }}
                draggable={true}
                onDragStart={this.handleDragStart}
                onDrag={this.handleImageDrag}
                onDragEnd={this.handleDragEnd}
              />
            </Spin>
          </div>
          <ImageListHorizontal
            propImageList={imageList}
            onImageClick={onHorImageClick}
            bottomImageListWidth={clientWidth - 200}
            viewIndex={index}
            horizontalImageHeight={horizontalImageHeight}
          />
        </div>
      ), this.node
    );
  }
}
export default ImageView;
