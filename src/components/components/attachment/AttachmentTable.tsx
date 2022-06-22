/**
 * @description: 附件Table表
 * @author: lll
 * @createTime: 2021/3/30 17:13
 **/
import React, { useContext } from 'react';
import { Table, Row } from 'antd';
import { AttachmentData } from './CommonInterface';
import { AttachmentContext, getFileType } from './AttachmentView';
import './AttachmentTable.less';

interface IProps {
  loading: boolean,
  handleClick: (file: AttachmentData, fileType: string) => void,
}
const AttachmentTable = (props: IProps) => {
  const { attachmentState } = useContext(AttachmentContext);
  const { loading, handleClick } = props;
  const fileIcon = (row: AttachmentData) => {
    const fileType: string = getFileType(row.sourceUrl);
    const fileBlock = (iconType: string, filename: string) => (
      <Row align="middle">
        <div className={iconType} />
        <a className="filename" onClick={() => handleClick(row, fileType)}>{filename}</a>
      </Row>
    );
    switch (fileType) {
      case 'picture': return fileBlock('picture-icon', row.filename);
      case 'music': return fileBlock('music-icon', row.filename);
      case 'video': return fileBlock('video-icon', row.filename);
      case 'pdf': return fileBlock('pdf-icon', row.filename);
      case 'word': return fileBlock('word-icon', row.filename);
      case 'ppt': return fileBlock('ppt-icon', row.filename);
      case 'excel': return fileBlock('excel-icon', row.filename);
      default:
        return fileBlock('', '无法识别文档');
    }
  };
  const columns: any = [{
    title: '文件名',
    dataIndex: 'filename',
    width: '50%',
    render: (text: string, row: any) => fileIcon(row)
  }, {
    title: '大小',
    dataIndex: 'size'
  }, {
    title: '修改日期',
    dataIndex: 'updateTime'
  }];
  return (
    <Table
      size="small"
      loading={loading}
      pagination={false}
      columns={columns}
      dataSource={attachmentState.attachmentList}
      style={{ width: '100%' }}
      rowKey={(row: AttachmentData) => row.id}
    />
  );
};
export default AttachmentTable;