/**
 * @description: 视频播放器
 * @author: lll
 * @createTime: 2021/4/8 15:42
 **/
import React, { useEffect, useRef, useState } from 'react';
import { Row, Space, Spin, Slider } from 'antd';
import { CloseOutlined, PauseOutlined, CaretRightOutlined, SoundOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { colors } from '@utils/CommonVars';
import './VideoView.less';

const clientHeight: number = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
const clientWidth: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

interface IProps {
  videoUrl: string,
  videoView: boolean,
  closeView: () => void
}
const VideoView = (props: IProps) => {
  const { videoUrl, videoView, closeView } = props;
  const videoRef: any = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [VDuration, setVDuration] = useState<number>(0);
  const [duration, setDuration] = useState<string>('00:00');
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isVolume, setIsVolume] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [isControls, setIsControls] = useState<boolean>(false);
  useEffect(() => {
    getDuration();
    videoEnded();
    // 设置初始音量
    videoRef.current.volume = volume / 100;
  }, []);
  useEffect(() => {
    getCurrentTime();
  }, [currentTime]);
  // 关闭播放器
  const hiddenVideo = () => {
    // 显示滚动条
    // @ts-ignore
    document.documentElement.style.overflow = 'auto';
    closeView();
    setIsFullScreen(false);
    setIsPlay(false);
    setIsVolume(false);
    setProgressPercent(0);
    setIsVertical(false);
    videoRef.current.pause();
  };
  // 获取视频总时长
  const getDuration = () => {
    videoRef.current.addEventListener('loadedmetadata', () => {
      setLoading(false);
      const time: any = videoRef.current.duration;
      const tempDuration = formatTime(time);
      setVDuration(time);
      setDuration(tempDuration);
      // 视频加载完成后，自动播放
      playVideo();
      // 判断是否为竖屏格式
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
      if (videoWidth < videoHeight) {
        setIsVertical(true);
      }
    });
  };
  // 获取当前时间以及进度条
  const getCurrentTime = () => {
    videoRef.current.addEventListener('timeupdate', () => {
      const time: any = videoRef.current.currentTime;
      const tempCurrentTime = formatTime(time);
      setCurrentTime(tempCurrentTime);
      if (VDuration !== 0) {
        setProgressPercent(time);
      }
    });
  };
  // 格式化时间
  const formatTime = (time: any) => {
    let minute: any = Math.floor(time / 60);
    minute < 10 && (minute = '0' + minute);
    return minute + ':' + (time % 60 / 100).toFixed(2).slice(-2);
  };
  // 播放视频
  const playVideo = () => {
    videoRef.current.play();
    setIsPlay(true);
  };
  // 暂停播放
  const unPlayVideo = () => {
    videoRef.current.pause();
    setIsPlay(false);
  };
  // 视频播放结束
  const videoEnded = () => {
    videoRef.current.addEventListener('ended', () => {
      setIsPlay(false);
    });
  };
  // 调节音量
  const changeVolume = (volume: any) => {
    videoRef.current.volume = volume / 100;
    setVolume(volume);
  };
  // 音量按钮点击
  const onSoundButtonClick = (e: any) => {
    e.stopPropagation();
    setIsVolume(!isVolume);
  };
  // 手动调节进度条
  const changeProgress = (value: any) => {
    videoRef.current.currentTime = value;
    setProgressPercent(value);
  };
  return (
    <div
      className="view-video-container"
      style={{ display: videoView ? 'flex' : 'none' }}
      onClick={() => setIsVolume(false)}
    >
      <Row className="top-icon-container">
        <CloseOutlined className="close-icon" title="退出" onClick={hiddenVideo} />
      </Row>
      <Spin spinning={loading}>
        <div
          className="play-screen-container"
          style={{ width: isFullScreen ? clientWidth : 1132, height: isFullScreen ? clientHeight : 637 }}
          onMouseOver={() => setIsControls(true)}
          onMouseOut={() => setIsControls(false)}
        >
          <video ref={videoRef} className="play-screen" src={videoUrl} style={{ objectFit: isVertical ? 'contain' : 'fill' }} />
          <div className="play-controls" style={{ display: isControls ? 'block' : 'none' }}>
            <div className="play-controls-progress">
              <Slider style={{ margin: 0 }} min={0} max={VDuration} step={1} value={progressPercent} tipFormatter={null} onChange={changeProgress} />
            </div>
            <Row justify="space-between" className="play-controls-bottom">
              <Space>
                {isPlay ? <PauseOutlined className="icon-style" onClick={unPlayVideo} /> : <CaretRightOutlined className="icon-style" onClick={playVideo} />}
                <div className="time-container">
                  <span className="current">{currentTime}</span> / <span className="duration">{duration}</span>
                </div>
              </Space>
              <Space size="large">
                <div>
                  <SoundOutlined
                    className="icon-style"
                    onClick={onSoundButtonClick}
                    style={{ color: isVolume ? colors.primaryColor : '#eee' }}
                  />
                  <div className="volume-container" style={{ display: isVolume ? 'block' : 'none' }} onClick={(e: any) => e.stopPropagation()}>
                    <Slider className="volume-controls" defaultValue={volume} vertical tooltipVisible={false} onChange={changeVolume} />
                  </div>
                  <div className="volume-content" style={{ display: isVolume ? 'block' : 'none' }}>
                    当前音量：<span style={{ color: colors.primaryColor }}>{volume}</span>
                  </div>
                </div>
                {isFullScreen ? <FullscreenExitOutlined className="icon-style" onClick={() => setIsFullScreen(false)} />
                : <FullscreenOutlined className="icon-style" onClick={() => setIsFullScreen(true)} />}
              </Space>
            </Row>
          </div>
        </div>
      </Spin>
    </div>
  );
};
export default VideoView;