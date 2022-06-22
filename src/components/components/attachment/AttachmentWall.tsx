/**
 * @description: 附件展示墙
 * @author: lll
 * @createTime: 2021/3/30 17:25
 **/
import React, { useContext } from 'react';
import { Row, Image } from 'antd';
import { AttachmentData } from './CommonInterface';
import { AttachmentContext, getFileType } from './AttachmentView';
import './AttachmentWall.less';

interface IProps {
  handleClick: (file: AttachmentData, fileType: string) => void,
}

const AttachmentWall = (props: IProps) => {
  const { attachmentState } = useContext(AttachmentContext);
  const { handleClick } = props;
  const attachmentWall = () => {
    const attachmentWall = attachmentState.attachmentList.map((item: any) => {
      const fileType: string = getFileType(item.sourceUrl);
      const fileBlock = (logoType: string, filename: string) => {
        return <div className="file-block" key={item.id} onClick={() => handleClick(item, fileType)}>
          <div className={logoType} />
          <a className="file-name">{filename}</a>
        </div>;
      };
      switch (fileType) {
        case 'picture': return (
          <div className="file-block" key={item.id} onClick={() => handleClick(item, fileType)}>
            <div className="picture-logo">
              <Image src={item.sourceUrl} width={84} height={84} preview={false} />
            </div>
            <a className="file-name">{item.filename}</a>
          </div>
        );
        case 'music': return fileBlock('music-logo', item.filename);
        case 'video': return fileBlock('video-logo', item.filename);
        case 'pdf': return fileBlock('pdf-logo', item.filename);
        case 'word': return fileBlock('word-logo', item.filename);
        case 'ppt': return fileBlock('ppt-logo', item.filename);
        case 'excel': return fileBlock('excel-logo', item.filename);
        default:
          return fileBlock('', '无法识别文档类型');
      }
    });
    return attachmentWall;
  };
  return (
    <Row>
      {attachmentWall()}
    </Row>
  );
};
export default AttachmentWall;