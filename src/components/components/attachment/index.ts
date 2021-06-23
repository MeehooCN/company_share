/**
 * @description: 附件预览组件导出
 * @author: lll
 * @createTime: 2021/4/25 9:22
 **/
export { default as AttachmentTable } from './AttachmentTable';
export { default as AttachmentWall } from './AttachmentWall';
export { default as ImageView } from './ImageView';
export { default as VideoView } from './VideoView';
export { default as MusicView } from './MusicView';

export interface ImageData {
  id: string,
  sourceUrl: string,
  thumbnailUrl: string,
  thumbnailTrueUrl: string,
  name: string,
  width: number,
  height: number
}

export interface AttachmentData {
  id: string,
  filename: string,
  size: string,
  updateTime: string,
  sourceUrl: string,
  thumbnailUrl: string,
  thumbnailTrueUrl: string,
}

export interface MusicData {
  id: string,
  name: string,
  sourceUrl: string
}