/**
 * @description: 描述
 * @author: lll
 * @createTime: 2021/4/8 10:14
 **/
import { AttachmentData, ImageData, MusicData } from './CommonInterface';

interface ImageInfo {
  imageView: boolean,
  imageIndex: number
}
interface VideoInfo {
  videoUrl?: string,
  videoView: boolean
}
interface MusicInfo {
  musicView: boolean,
  musicIndex: number
}
interface AttachmentInit {
  attachmentList: Array<AttachmentData>,
  imageList: Array<ImageData>,
  imageInfo: ImageInfo,
  videoInfo: VideoInfo,
  musicInfo: MusicInfo,
  musicList: Array<MusicData>,
}
const attachmentInit: AttachmentInit = {
  attachmentList: [],
  imageList: [],
  imageInfo: {
    imageView: false,
    imageIndex: -1
  },
  videoInfo: {
    videoUrl: '',
    videoView: false
  },
  musicList: [],
  musicInfo: {
    musicView: false,
    musicIndex: -1
  }
};
const attachmentReducer = (state = attachmentInit, action: any) => {
  const actionMaps: Map<string, any> = new Map([
    ['setAttachmentList', { ...state, attachmentList: action.attachmentList }],
    ['setImageList', { ...state, imageList: action.imageList }],
    ['setImageInfo', { ...state, imageInfo: action.imageInfo }],
    ['setVideoInfo', { ...state, videoInfo: action.videoInfo }],
    ['setMusicInfo', { ...state, musicInfo: action.musicInfo }],
    ['setMusicList', { ...state, musicList: action.musicList }],
  ]);
  return actionMaps.get(action.type) || state;
};
export { attachmentInit, attachmentReducer };
