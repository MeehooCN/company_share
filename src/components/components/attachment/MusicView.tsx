/**
 * @description: 音频播放器
 * @author: lll
 * @createTime: 2021/4/12
 **/
import React, { useEffect, useRef, useState } from 'react';
import { Row, Space, Slider, message } from 'antd';
import {
  MinusOutlined, CloseOutlined, LeftCircleTwoTone, PauseCircleTwoTone, PlayCircleTwoTone,
  RightCircleTwoTone, SoundTwoTone, BorderOutlined, DownloadOutlined, setTwoToneColor
} from '@ant-design/icons';
import { colors } from '@utils/CommonVars';
import { MusicData } from '@utils/CommonInterface';
import './MusicView.less';

interface IProps {
  index: number,
  musicList: Array<MusicData>
  musicView: boolean,
  closeView: () => void
}
setTwoToneColor(colors.primaryColor);
const MusicView = (props: IProps) => {
  const { index, musicList, musicView, closeView } = props;
  const audioRef: any = useRef(null);
  const [currMusic, setCurrMusic] = useState<MusicData>({ id: '', name: '', sourceUrl: '' });
  const [viewIndex, setViewIndex] = useState<number>(-1);
  const [VDuration, setVDuration] = useState<number>(0);
  const [duration, setDuration] = useState<string>('00:00');
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isVolume, setIsVolume] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [isMini, setIsMini] = useState<boolean>(false);
  useEffect(() => {
    if (index > -1 && musicList.length > 0) {
      setCurrMusic(musicList[index]);
      setViewIndex(index);
    }
  }, [index]);
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
  // 音量按钮点击
  const onSoundButtonClick = (e: any) => {
    e.stopPropagation();
    setIsVolume(!isVolume);
  };
  // 上一曲
  const toPreviousMusic = () => {
    if (viewIndex - 1 >= 0) {
      const tempViewIndex = viewIndex - 1;
      setCurrMusic(musicList[tempViewIndex]);
      setViewIndex(tempViewIndex);
    } else {
      message.warning('已经是第一曲了！');
    }
  };
  // 下一曲
  const toNextMusic = () => {
    const totalIndex: number = musicList.length - 1;
    if (viewIndex + 1 <= totalIndex) {
      const tempViewIndex = viewIndex + 1;
      setCurrMusic(musicList[tempViewIndex]);
      setViewIndex(tempViewIndex);
    } else {
      message.warning('已经是最后一曲了！');
    }
  };
  // 切换音乐
  const switchMusic = (music: MusicData, musicIndex: number) => {
    setCurrMusic(music);
    setViewIndex(musicIndex);
  };
  // 手动调节进度条
  const changeProgress = (value: any) => {
    audioRef.current.currentTime = value;
    setProgressPercent(value);
  };
  const musicItemBlock = () => {
    const musicItemBlock = musicList.map((musicItem: MusicData) => {
      const tempIndex = musicList.findIndex((item: MusicData) => item.id === musicItem.id);
      return (
        <div className="music-musicItem-container" key={musicItem.id} onClick={() => switchMusic(musicItem, tempIndex)}>
          <div className="music-musicItem-content">
            <span style={{ color: viewIndex === tempIndex ? colors.primaryColor : '' }}>{musicItem.name}</span>
            <DownloadOutlined className="music-musicItem-download" />
          </div>
        </div>
      );
    });
    return musicItemBlock;
  };
  return (
    <div
      className={'view-music-container' + (isMini ? ' miniView-music-container' : ' maxView-music-container')}
      style={{ display: musicView ? 'block' : 'none' }}
      onClick={() => setIsVolume(false)}
    >
      <Row className="music-header-title" justify="center" align="middle">
        <div>{currMusic.name}</div>
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
            <LeftCircleTwoTone onClick={toPreviousMusic} />
            {isPlay ? <PauseCircleTwoTone style={{ fontSize: 52 }} onClick={unPlayMusic} /> : <PlayCircleTwoTone style={{ fontSize: 52 }} onClick={playMusic} />}
            <RightCircleTwoTone onClick={toNextMusic} />
          </Row>
          <SoundTwoTone className="music-volume-controls" onClick={onSoundButtonClick} />
          <div className="music-slider-container" style={{ display: isVolume ? 'block' : 'none' }} onClick={(e: any) => e.stopPropagation()}>
            <Slider className="music-slider" vertical reverse defaultValue={volume} onChange={changeVolume} />
          </div>
        </div>
        <div className="music-controls-progress">
          <Slider style={{ marginBottom: 0 }} min={0} max={VDuration} step={1} value={progressPercent} tipFormatter={null} onChange={changeProgress} />
        </div>
        <Row justify="space-between" align="middle">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </Row>
      </div>
      <audio ref={audioRef} src={currMusic.sourceUrl} />
      <div className="music-musicItem-block">
        {musicItemBlock()}
      </div>
    </div>
  );
};
export default MusicView;