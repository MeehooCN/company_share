/**
 * @description: 附件展示墙
 * @author: lll
 * @createTime: 2021/3/30 17:25
 **/
import React, { useContext } from 'react';
import { Row, Image } from 'antd';
import { AttachmentData } from '@utils/CommonInterface';
import { AttachmentContext, getFileType } from '@components/components/attachment/AttachmentView';
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
        return <div className="fileBlock" key={item.id} onClick={() => handleClick(item, fileType)}>
          <div className={logoType} />
          <a className="fileName">{filename}</a>
        </div>;
      };
      switch (fileType) {
        case 'picture': return (
          <div className="fileBlock" key={item.id} onClick={() => handleClick(item, fileType)}>
            <div className="pictureLogo">
              <Image src={item.sourceUrl} width={84} height={84} preview={false} />
            </div>
            <a className="fileName">{item.filename}</a>
          </div>
        );
        case 'music': return fileBlock('musicLogo', item.filename);
        case 'video': return fileBlock('videoLogo', item.filename);
        case 'pdf': return fileBlock('pdfLogo', item.filename);
        case 'word': return fileBlock('wordLogo', item.filename);
        case 'ppt': return fileBlock('pptLogo', item.filename);
        case 'excel': return fileBlock('excelLogo', item.filename);
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