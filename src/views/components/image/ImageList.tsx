/**
 * @description: 图片列表
 * @author: cnn
 * @createTime: 2020/7/22 16:43
 **/
import React from 'react';
import { Row } from 'antd';
import Mock, { Random } from 'mockjs';
import { TitleWithDescription, API, CodeExample, ImageList } from '@components/index';
import { ImageData } from '@utils/CommonInterface';

interface IProps {}

interface IState {
  imageList: Array<ImageData>
}

class ImageListView extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    imageList: []
  };
  componentDidMount(): void {
    this.getImageList();
  }
  // 初始化图片列表
  private getImageList = () => {
    const imageList: Array<ImageData> = Mock.mock({
      'imageList|10-30': [{
        'id|+1': 1,
        'sourceUrl': Random.dataImage('300x250'),
        'thumbnailUrl|+1': [
          Random.dataImage('300x250'),
          Random.dataImage('450x300'),
          Random.dataImage('300x500'),
          Random.dataImage('300x600'),
          Random.dataImage('400x400'),
          Random.dataImage('400x400'),
        ],
        'thumbnailTrueUrl|+1': '',
        'name': Random.cname(),
        'width|+1': [300,450,300,300,400,400],
        'height|+1': [250,300,500,600,400,400]
      }]
    }).imageList;
    this.setState({ imageList });
  };
  render(): React.ReactNode {
    const { imageList } = this.state;
    const paramList = [{
      name: 'imageList',
      description: '图片列表',
      type: 'Array<ImageData>',
      defaultValue: '[]'
    }, {
      name: 'listChange',
      description: '可选，是否改变图片列表',
      type: 'bool',
      defaultValue: ''
    }, {
      name: 'containerWidth',
      description: '可选，容器宽度',
      type: 'number',
      defaultValue: '1200'
    }];
    const viewComponents = <ImageList imageList={imageList} listChange={false} containerWidth={1000} />;
    const code = '<ImageList imageList={[]} changeList={false} containerWidth={1000} />';
    return (
      <Row>
        <TitleWithDescription title="ImageList" content="图片列表。" />
        <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
        <CodeExample viewComponents={viewComponents} code={code} />
        <API dataList={paramList} />
      </Row>
    );
  }
}
export default ImageListView;
