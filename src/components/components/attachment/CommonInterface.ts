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