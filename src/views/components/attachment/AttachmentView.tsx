/**
 * @description: 附件浏览
 * @author: lll
 * @createTime: 2021/4/14
 **/
import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { CodeExample, TitleWithDescription, AttachmentView as AttachmentViewComponent, API } from '@components/index';
import { AttachmentData} from '@utils/CommonInterface';

const AttachmentView = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [attachmentList, setAttachmentList] = useState<Array<AttachmentData>>([]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const dataList: any = [{
        id: '0',
        filename: '花花',
        size: '2.2M',
        updateTime: '2021-3-29',
        sourceUrl: 'https://img1.baidu.com/it/u=1361135963,570304265&fm=26&fmt=auto&gp=0.jpg',
        thumbnailUrl: 'https://img1.baidu.com/it/u=1361135963,570304265&fm=26&fmt=auto&gp=0.jpg',
        thumbnailTrueUrl: 'https://img1.baidu.com/it/u=1361135963,570304265&fm=26&fmt=auto&gp=0.jpg',
      }, {
        id: '1',
        filename: '小狗子',
        size: '5.2M',
        updateTime: '2021-3-29',
        sourceUrl: 'https://img2.baidu.com/it/u=1842750661,82505179&fm=26&fmt=auto&gp=0.jpg',
        thumbnailUrl: 'https://img2.baidu.com/it/u=1842750661,82505179&fm=26&fmt=auto&gp=0.jpg',
        thumbnailTrueUrl: 'https://img2.baidu.com/it/u=1842750661,82505179&fm=26&fmt=auto&gp=0.jpg',
      }, {
        id: '2',
        filename: '美少女,元气可爱美少女',
        size: '4.6M',
        updateTime: '2021-3-30',
        sourceUrl: 'http://zyjy.meehoo.com/testStatic/testImage.png',
        thumbnailUrl: 'http://zyjy.meehoo.com/testStatic/testImage.png',
        thumbnailTrueUrl: 'http://zyjy.meehoo.com/testStatic/testImage.png',
      }, {
        id: '3',
        filename: '横屏视频.mp4',
        size: '3.2M',
        updateTime: '2021-3-30',
        sourceUrl: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4',
        // sourceUrl: 'https://v-cdn.zjol.com.cn/276993.mp4',
        thumbnailUrl: '',
        thumbnailTrueUrl: '',
      }, {
        id: '4',
        filename: 'Excel文件',
        size: '3.2M',
        updateTime: '2021-3-30',
        sourceUrl: 'http://zyjy.meehoo.com/testStatic/testExcel.xlsx',
        thumbnailUrl: '',
        thumbnailTrueUrl: '',
      }, {
        id: '5',
        filename: '仓颉.mp3',
        size: '1.0M',
        updateTime: '2021-3-30',
        sourceUrl: 'http://zyjy.meehoo.com/testStatic/testAudio.mp3',
        thumbnailUrl: '',
        thumbnailTrueUrl: '',
      }, {
        id: '6',
        filename: 'word文件',
        size: '4.6M',
        updateTime: '2021-3-30',
        sourceUrl: 'http://zyjy.meehoo.com/testStatic/testWord.docx',
        thumbnailUrl: '',
        thumbnailTrueUrl: '',
      }, {
        id: '7',
        filename: 'PPT文件',
        size: '3.2M',
        updateTime: '2021-3-30',
        sourceUrl: 'http://zyjy.meehoo.com/testStatic/testPPT.pptx',
        thumbnailUrl: '',
        thumbnailTrueUrl: '',
      }, {
        id: '8',
        filename: 'PDF文件',
        size: '1.0M',
        updateTime: '2021-3-30',
        sourceUrl: 'http://zyjy.meehoo.com/testStatic/testPdf.pdf',
        thumbnailUrl: '',
        thumbnailTrueUrl: '',
      }, {
        id: '9',
        filename: '竖屏视频.mp4',
        size: '3.2M',
        updateTime: '2021-4-14',
        sourceUrl: 'https://v-cdn.zjol.com.cn/276993.mp4',
        // sourceUrl: 'https://v-cdn.zjol.com.cn/276998.mp4',
        thumbnailUrl: '',
        thumbnailTrueUrl: '',
      }, {
        id: '10',
        filename: '夏天的风.mp3',
        size: '3.2M',
        updateTime: '2021-4-16',
        sourceUrl: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_96145895&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
        thumbnailUrl: '',
        thumbnailTrueUrl: '',
      }];
      setAttachmentList(dataList);
      setLoading(false);
    }, 1000);
  }, []);
  const paramList = [{
    name: 'loading',
    description: '附件列表数据是否加载完成',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'attachmentList',
    description: '附件列表数据',
    type: 'Array<AttachmentData>',
    defaultValue: '[]'
  }];
  const attachmentParamList = [{
    name: 'id',
    description: '附件id',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'filename',
    description: '附件名',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'size',
    description: '附件大小',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'updateTime',
    description: '修改日期',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'sourceUrl',
    description: '附件地址',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'thumbnailUrl',
    description: '图片缩略图地址（非图片时为空）',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'thumbnailTrueUrl',
    description: '图片缩略图地址（懒加载使用，非图片时为空）',
    type: 'string',
    defaultValue: '无'
  }];
  const viewComponents = <AttachmentViewComponent loading={loading} attachmentList={attachmentList} />;
  const code: string = '<AttachmentView loading={loading} attachmentList={attachmentList} />';
  return (
    <Row>
      <TitleWithDescription title="AttachmentView" content="附件浏览。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={paramList} />
      <API title="AttachmentData" description="附件列表每个附件具体参数。" dataList={attachmentParamList} />
    </Row>
  );
};
export default AttachmentView;