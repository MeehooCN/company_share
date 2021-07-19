/**
 * @description: 附件列表
 * @author: lll
 * @createTime: 2021/3/29 15:46
 **/
import React, { useEffect, useState, createContext, useReducer } from 'react';
import { Card } from 'antd';
import { MenuOutlined, AppstoreOutlined } from '@ant-design/icons';
import { AttachmentData, ImageData, MusicData } from './CommonInterface';
import { AttachmentTable, AttachmentWall, ImageView, VideoView, MusicView } from './index';
import { attachmentInit, attachmentReducer } from './AttachmentReducer';

interface IProps {
  loading: boolean,
  attachmentList: Array<AttachmentData>
}
export const AttachmentContext = createContext({ attachmentState: attachmentInit, attachmentDispatch: (value: any) => {} });
// 获取附件类型 （参数：附件的url，必传）
export const getFileType = (sourceUrl: string) => {
// 附件类型的后缀对应表（可自行添加对应附件类型下的附件后缀，此处未罗列完整!）
  const fileTypeList = [{
    type: 'picture',
    suffix: ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'],
  }, {
    type: 'music',
    suffix: ['mp3', 'wma', 'ogg'],
  }, {
    type: 'video',
    suffix: ['mp4', 'mkv', 'wmv', 'avi', 'rm'],
  }, {
    type: 'pdf',
    suffix: ['pdf'],
  }, {
    type: 'word',
    suffix: ['doc', 'docx', 'dotx'],
  }, {
    type: 'ppt',
    suffix: ['ppt', 'pptx'],
  }, {
    type: 'excel',
    suffix: ['xls', 'xlsx'],
  }];
  let fileType = ''; // 附件类型
  let suffix = ''; // 附件后缀
  const fileArr = sourceUrl.split('.');
  suffix = fileArr[fileArr.length - 1];
  if (suffix !== '') {
    suffix = suffix.toLocaleLowerCase();
    for (let item of fileTypeList) {
      const index = item.suffix.findIndex((value: any) => value === suffix);
      if (index > -1) {
        fileType = item.type;
      }
    }
  }
  return fileType;
};

const AttachmentView = (props: IProps) => {
  const { loading, attachmentList } = props;
  const [attachmentState, attachmentDispatch] = useReducer(attachmentReducer, attachmentInit);
  const [isList, setIsList] = useState<boolean>(true);
  useEffect(() => {
    attachmentDispatch({
      type: 'setAttachmentList',
      attachmentList: attachmentList
    });
  }, [attachmentList]);
  useEffect(() => {
    if (attachmentState.attachmentList.length > 0) {
      getImageList();
    }
  }, [attachmentState.attachmentList]);
  // 获取图片列表
  const getImageList = () => {
    const imageViewList: Array<ImageData> = [];
    const musicViewList: Array<MusicData> = [];
    attachmentState.attachmentList.forEach((item: AttachmentData) => {
      const fileType: string = getFileType(item.sourceUrl);
      if (fileType === 'picture') {
        imageViewList.push({
          id: item.id,
          sourceUrl: item.sourceUrl,
          thumbnailUrl: item.thumbnailUrl,
          thumbnailTrueUrl: item.thumbnailTrueUrl,
          name: item.filename,
          width: 0,
          height: 0
        });
      }
      if (fileType === 'music') {
        musicViewList.push({
          id: item.id,
          name: item.filename,
          sourceUrl: item.sourceUrl
        });
      }
    });
    attachmentDispatch({
      type: 'setImageList',
      imageList: imageViewList
    });
    attachmentDispatch({
      type: 'setMusicList',
      musicList: musicViewList
    });
  };
  // 点击附件，查看详情
  const handleClick = (file: AttachmentData, fileType: string) => {
    const viewInOffice = ['word', 'ppt', 'excel'];
    if (fileType === 'picture') {
      // 隐藏滚动条
      document.documentElement.style.overflow = 'hidden';
      const imageIndex: number = attachmentState.imageList.findIndex((imageItem: ImageData) => imageItem.id === file.id);
      attachmentDispatch({
        type: 'setImageInfo',
        imageInfo: {
          imageView: true,
          imageIndex
        }
      });
    } else if (viewInOffice.indexOf(fileType) !== -1) {
      window.open('https://view.officeapps.live.com/op/view.aspx?src=' + file.sourceUrl);
    } else if (fileType === 'video') {
      // 隐藏滚动条
      document.documentElement.style.overflow = 'hidden';
      attachmentDispatch({
        type: 'setVideoInfo',
        videoInfo: {
          videoUrl: file.sourceUrl,
          videoView: true
        }
      });
    } else if (fileType === 'music') {
      const musicIndex: number = attachmentState.musicList.findIndex((musicItem: MusicData) => musicItem.id === file.id);
      attachmentDispatch({
        type: 'setMusicInfo',
        musicInfo: {
          musicView: true,
          musicIndex
        }
      });
    } else {
      window.open(file.sourceUrl);
    }
  };
  // 关闭大图查看窗口
  const handleImageClose = () => {
    attachmentDispatch({
      type: 'setImageInfo',
      imageInfo: {
        imageView: false
      }
    });
  };
  // 关闭视频播放窗口
  const handleVideoClose = () => {
    attachmentDispatch({
      type: 'setVideoInfo',
      videoInfo: {
        videoView: false
      }
    });
  };
  // 关闭音频播放窗口
  const handleMusicClose = () => {
    attachmentDispatch({
      type: 'setMusicInfo',
      musicInfo: {
        musicView: false
      }
    });
  };
  return (
    <AttachmentContext.Provider value={{ attachmentState, attachmentDispatch }}>
      <Card
        title="附件列表"
        size="small"
        extra={isList ? <MenuOutlined onClick={() => setIsList(false)} /> : <AppstoreOutlined onClick={() => setIsList(true)} />}
        style={{ width: '100%' }}
      >
        {isList ? <AttachmentTable loading={loading} handleClick={handleClick} /> : <AttachmentWall handleClick={handleClick} />}
      </Card>
      <ImageView
        index={attachmentState.imageInfo.imageIndex}
        imageList={attachmentState.imageList}
        imageView={attachmentState.imageInfo.imageView}
        closeView={handleImageClose}
      />
      <VideoView
        videoUrl={attachmentState.videoInfo.videoUrl}
        videoView={attachmentState.videoInfo.videoView}
        closeView={handleVideoClose}
      />
      <MusicView
        index={attachmentState.musicInfo.musicIndex}
        musicList={attachmentState.musicList}
        musicView={attachmentState.musicInfo.musicView}
        closeView={handleMusicClose}
      />
    </AttachmentContext.Provider>
  );
};
export default AttachmentView;