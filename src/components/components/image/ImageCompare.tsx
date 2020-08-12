/**
 * @description: 图片对比
 * @author: cnn
 * @createTime: 2020/8/11 17:26
 **/
import React from 'react';
import { Row } from 'antd';
import { CloseOutlined, FullscreenExitOutlined, LoadingOutlined } from '@ant-design/icons';

// 最大放大倍数
const maxScale: number = 2;
// 最小缩放倍数
const minScale: number = 0.5;

interface IProps {
  retouchUrl: string,
  initUrl: string,
  comparisonView: boolean,
  setComparisonView: any,
  openTimes: number
}

interface IState {
  isPCFlag: boolean,
  clientWidth: number,
  clientHeight: number,
  initWidth: number,
  isLoaded: boolean,
  ratio: number,
  imageWidth: number,
  originWidth: number,
  imageHeight: number,
  originHeight: number,
  showLabel: boolean,
  retouchUrl: string,
  initUrl: string,
  canDragImage: boolean,
  startX: number,
  startY: number,
  moveX: number,
  moveY: number
}

class ImageCompare extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.imgDiv = React.createRef();
    this.initDiv = React.createRef();
  }
  readonly state: Readonly<IState> = {
    isPCFlag: true,
    clientWidth: 0,
    clientHeight: 0,
    initWidth: 0,
    isLoaded: false,
    imageWidth: 0,
    originWidth: 0,
    imageHeight: 0,
    originHeight: 0,
    ratio: 1,
    showLabel: false,
    retouchUrl: '',
    initUrl: '',
    canDragImage: false,
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0
  };
  componentWillMount() {
    // 判断是否是PC
    let isPCFlag = this.isPC();
    let clientWidth = 1520;
    let clientHeight = 1050;
    if (isPCFlag) {
      clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
      clientHeight = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
    }
    this.setState({ isPCFlag, clientWidth, clientHeight });
  }
  componentDidMount() {
    window.addEventListener('resize', this.windowResize);
    const { retouchUrl, initUrl } = this.props;
    this.setState({ retouchUrl, initUrl }, this.handleImgLoadStatus);
  }
  componentWillReceiveProps(nextProps: IProps, nextContext: any) {
    const { openTimes, comparisonView } = nextProps;
    if (openTimes !== this.props.openTimes && comparisonView) {
      const { retouchUrl, initUrl } = nextProps;
      this.setState({ retouchUrl, initUrl }, () => {
        this.handleImgLoadStatus();
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }
  private readonly imgDiv: React.RefObject<any>;
  private readonly initDiv: React.RefObject<any>;

  public isPC = () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag: boolean = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  };
  public windowResize = () => {
    let clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
    let clientHeight = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
    this.setState({ clientWidth, clientHeight });
  };
  // 鼠标移动
  public handleMouseOver = (e: MouseEvent) => {
    const { imageWidth, moveX } = this.state;
    let imgDiv = this.imgDiv.current;
    let reactObj = imgDiv.getBoundingClientRect();
    if (e.clientX / 5) {
      let initWidth = e.clientX - reactObj.left;
      if (moveX < 0 && initWidth > (imageWidth + moveX)) {
        this.setState({ initWidth: initWidth, showLabel: false });
      } else if (moveX > 0 && initWidth < moveX) {
        this.setState({ initWidth, showLabel: false });
      } else {
        this.setState({ initWidth, showLabel: true });
      }
    }
  };
  public handleImgLoadStatus = () => {
    const { clientWidth, clientHeight, retouchUrl, initUrl } = this.state;
    let ratioX: number = 1;
    let ratioY: number = 1;
    let ratio: number = 1;
    this.setState({ isLoaded: false });
    const initImg = new Image();
    initImg.src = initUrl;
    const retouchImg = new Image();
    retouchImg.src = retouchUrl;
    retouchImg.onload = () => {
      ratioX = retouchImg.width / (clientWidth - 60);
      ratioY = retouchImg.height / (clientHeight - 60);
      ratio = Math.floor(Math.max(...[ratioX, ratioY])) + 1;
      this.setState({
        isLoaded: true,
        ratio,
        imageWidth: retouchImg.width / ratio,
        originWidth: retouchImg.width / ratio,
        imageHeight: retouchImg.height / ratio,
        originHeight: retouchImg.height / ratio
      }, this.centerImage);
    };
  };
  // 关闭对比模式
  private setComparisonView = () => {
    const { setComparisonView } = this.props;
    setComparisonView(false);
    this.setState({ retouchUrl: '', initUrl: '' });
  };
  // 监听鼠标滚轮，放大缩小图片
  private changeImageSize = (e: any) => {
    const { imageWidth, imageHeight, originWidth } = this.state;
    let deltaY = e.deltaY;
    // 向下 缩小图片
    if (deltaY > 0) {
      // 判断是否超过最小缩放倍数，超过则不可缩小
      if ((imageWidth / originWidth) > minScale) {
        this.setState({
          imageHeight: imageHeight * 0.8,
          imageWidth: imageWidth * 0.8
        });
      }
    }
    // 向上 放大图片
    else if (deltaY < 0) {
      // 判断是否超过最大放大倍数，超过则不可以再放大
      if ((imageWidth / originWidth) < maxScale) {
        this.setState({
          imageHeight: imageHeight * 1.2,
          imageWidth: imageWidth * 1.2
        });
      }
    }
  };
  // 开始拖动图片
  private handleDragStart = (e: any) => {
    const { startX, startY } = this.state;
    this.setState({ showLabel: false });
    this.setState({
      canDragImage: true,
      startX: e.clientX - startX,
      startY: e.clientY - startY
    });
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
    this.setState({ startX: moveX, startY: moveY, showLabel: true });
  };
  // 照片还原
  private centerImage = (e?: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { originWidth, originHeight } = this.state;
    this.setState({
      imageWidth: originWidth,
      imageHeight: originHeight,
      moveX: 0,
      moveY: 0,
      startY: 0,
      startX: 0
    });
  };
  render(): React.ReactNode {
    const { comparisonView } = this.props;
    const {
      retouchUrl, initUrl, clientWidth, clientHeight, isLoaded,
      initWidth, imageWidth, imageHeight, showLabel, moveY,
      moveX
    } = this.state;
    return (
      <Row
        onClick={this.setComparisonView}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: clientWidth,
          height: clientHeight,
          backgroundColor: 'rgba(0,0,0,.9)',
          display: comparisonView ? 'block' : 'none',
          zIndex: 999
        }}>
        <Row style={{ position: 'fixed', right: 10, top: 10, display: 'flex', fontSize: 24, zIndex: 3 }}>
          <FullscreenExitOutlined style={{ cursor: 'pointer', color: '#eee', transition: 'all 0.3s', marginRight: 20 }} title="居中" onClick={this.centerImage} />
          <CloseOutlined style={{ cursor: 'pointer', color: '#eee' }} title="关闭" onClick={this.setComparisonView} />
        </Row>
        <Row justify="center" align="middle" style={{ width: clientWidth, height: clientHeight }}>
          <div style={{ display: isLoaded ? 'none' : 'block' }}>
            <LoadingOutlined style={{ fontSize: 50, color: '#1890ff' }} />
          </div>
          <div
            ref={this.imgDiv}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={(e: any) => this.handleMouseOver(e)}
            onWheel={this.changeImageSize}
            style={{
              maxWidth: clientWidth,
              maxHeight: clientHeight,
              cursor: 'move',
              display: isLoaded ? 'block' : 'none'
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                display: showLabel ? 'block' : 'none',
                position: 'absolute',
                top: moveY + 20,
                left: initWidth,
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '0 2px 2px 0',
                padding: '5px 10px',
                zIndex: 999
              }}>修图后</div>
              <img
                alt="处理后的图"
                src={retouchUrl}
                draggable={true}
                onDragStart={this.handleDragStart}
                onDrag={this.handleImageDrag}
                onDragEnd={this.handleDragEnd}
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  transitionProperty: 'width, height',
                  transitionDuration: '0.3s',
                  position: 'relative',
                  top: moveY,
                  left: moveX,
                }}
              />
              <div
                ref={this.initDiv}
                style={{
                  position: 'absolute',
                  top: moveY,
                  left: moveX,
                  width: initWidth - moveX > imageWidth ? imageWidth : initWidth - moveX,
                  height: imageHeight,
                  overflow: 'hidden',
                  borderRight: '1px solid #000',
                }}>
                <img
                  alt="原图"
                  src={initUrl}
                  onDragStart={this.handleDragStart}
                  onDrag={this.handleImageDrag}
                  onDragEnd={this.handleDragEnd}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    transitionProperty: 'width, height',
                    transitionDuration: '0.3s'
                  }}
                />
              </div>
              <div style={{
                display: showLabel ? 'block' : 'none',
                position: 'absolute',
                top: moveY + 50,
                left: initWidth - 62,
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '2px 0 0 2px',
                padding: '5px 10px'
              }}>修图前</div>
            </div>
          </div>
        </Row>
      </Row>
    );
  }
}

export default ImageCompare;
