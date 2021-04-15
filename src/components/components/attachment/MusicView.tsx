/**
 * @description: 音频播放器
 * @author: lll
 * @createTime: 2021/4/12
 **/
import React, { useEffect, useRef, useState } from 'react';
import { Row, Space, Progress, Slider } from 'antd';
import {
  MinusOutlined, CloseOutlined, LeftCircleTwoTone, PauseCircleTwoTone, PlayCircleTwoTone,
  RightCircleTwoTone, SoundTwoTone, BorderOutlined, setTwoToneColor
} from '@ant-design/icons';
import './MusicView.less';
import { colors } from '@utils/CommonVars';

interface IProps {
  musicUrl: string,
  musicName: string,
  musicView: boolean,
  closeView: () => void
}
setTwoToneColor(colors.primaryColor);
const MusicView = (props: IProps) => {
  const { musicUrl, musicName, musicView, closeView } = props;
  const audioRef: any = useRef(null);
  const [VDuration, setVDuration] = useState<number>(0);
  const [duration, setDuration] = useState<string>('00:00');
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isVolume, setIsVolume] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(20);
  const [isMini, setIsMini] = useState<boolean>(false);
  useEffect(() => {
    getDuration();
    musicEnded();
    // 设置初始音量
    audioRef.current.volume = volume / 100;
  }, []);
  useEffect(() => {
    getCurrentTime();
  }, [currentTime]);
  // 关闭音乐播放器
  const hiddenVideo = () => {
    closeView();
    setIsPlay(false);
    setIsVolume(false);
    setProgressPercent(0);
    setIsMini(false);
    audioRef.current.pause();
  };
  // 获取视频总时长
  const getDuration = () => {
    audioRef.current.addEventListener('loadedmetadata', () => {
      const time: any = audioRef.current.duration;
      const tempDuration = formatTime(time);
      setVDuration(time);
      setDuration(tempDuration);
      // 音乐加载完成后自动播放
      playMusic();
    });
  };
  // 获取当前时间以及进度条
  const getCurrentTime = () => {
    audioRef.current.addEventListener('timeupdate', () => {
      const time: any = audioRef.current.currentTime;
      const tempCurrentTime = formatTime(time);
      setCurrentTime(tempCurrentTime);
      if (VDuration !== 0) {
        const percent = time * 100 / VDuration;
        setProgressPercent(percent);
      }
    });
  };
  // 格式化时间
  const formatTime = (time: any) => {
    let minute: any = Math.floor(time / 60);
    minute < 10 && (minute = '0' + minute);
    return minute + ':' + (time % 60 / 100).toFixed(2).slice(-2);
  };
  // 播放音乐
  const playMusic = () => {
    audioRef.current.play();
    setIsPlay(true);
  };
  // 暂停播放
  const unPlayMusic = () => {
    audioRef.current.pause();
    setIsPlay(false);
  };
  // 音乐播放结束
  const musicEnded = () => {
    audioRef.current.addEventListener('ended', () => {
      setIsPlay(false);
    });
  };
  // 调节音量
  const changeVolume = (volume: any) => {
    audioRef.current.volume = volume / 100;
    setVolume(volume);
  };
  const clickSoundButton = (e: any) => {
    e.stopPropagation();
    setIsVolume(!isVolume);
  };
  return (
    <div
      className={'view-music-container' + (isMini ? ' miniView-music-container' : ' maxView-music-container')}
      style={{ display: musicView ? 'block' : 'none' }}
      onClick={() => setIsVolume(false)}
    >
      <Row className="music-header-title" justify="center" align="middle">
        <div>{musicName}</div>
        <div className="music-switch">
          <Space size="large">
            {isMini ? <BorderOutlined className="music-switch-button" onClick={() => setIsMini(false)} />
            : <MinusOutlined className="music-switch-button" onClick={() => setIsMini(true)} />}
            <CloseOutlined className="music-switch-button" onClick={hiddenVideo} />
          </Space>
        </div>
      </Row>
      <div className="music-controls-container">
        <div className="music-controls">
          <Row justify="space-around" align="middle" className="play-pause-controls">
            <LeftCircleTwoTone />
            {isPlay ? <PauseCircleTwoTone style={{ fontSize: 52 }} onClick={unPlayMusic} /> : <PlayCircleTwoTone style={{ fontSize: 52 }} onClick={playMusic} />}
            <RightCircleTwoTone />
          </Row>
          <SoundTwoTone className="music-volume-controls" onClick={clickSoundButton} />
          <div className="music-slider-container" style={{ display: isVolume ? 'block' : 'none' }} onClick={(e: any) => e.stopPropagation()}>
            <Slider className="music-slider" vertical reverse defaultValue={volume} onChange={changeVolume} />
          </div>
        </div>
        <Progress size="small" strokeColor={{ '0%': colors.primaryColor, '100%': colors.primaryColor }} percent={progressPercent} showInfo={false} />
        <Row justify="space-between" align="middle">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </Row>
      </div>
      <audio ref={audioRef} src={musicUrl} />
    </div>
  );
};
export default MusicView;