/**
 * @description: 图片浏览
 * @author: cnn
 * @createTime: 2020/8/3 10:29
 **/
/* eslint no-unused-vars:0 */
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { TitleWithDescription, API, CodeExample, ImageComponent, ImageView as ImageViewComponent } from '@components/index';
import { ImageData } from '@utils/CommonInterface';

const ImageView = () => {
  const [imageList, setImageList] = useState<Array<ImageData>>([]);
  const [imageView, setImageView] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(-1);
  useEffect(() => {
    const imageList: Array<ImageData> = [{
      id: '1',
      thumbnailUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087715081,784938553&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087715081,784938553&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147531787&di=bbc49d2e18f148d851f26e75e3e1375d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7c7bf85a6038c76fc5cc0ac8e6bdc176a9bea574a6f8c-GvTWgT_fw658',
      name: 'misaka-1',
      width: 0,
      height: 0
    }, {
      id: '2',
      thumbnailUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4030263907,556408717&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4030263907,556408717&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596433123754&di=44649d15c301cc97bfabbbd4d81d413c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dbea2e73f8e18367aad897fd51e728b68%2F90f955a7d933c895dfb0b26dd91373f083020032.jpg',
      name: 'misaka-2',
      width: 0,
      height: 0
    }, {
      id: '3',
      thumbnailUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147588837&di=ffa801b9c9dc77d5d0b40e4db0b33331&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fce9f4aaaf1b253030e7b9ba2e6c14dc45320b5f2.jpg',
      name: 'misaka-3',
      width: 0,
      height: 0
    }];
    setImageList(imageList);
  }, []);
  const clickImage = (image: ImageData) => {
    // 隐藏滚动条
    document.documentElement.style.overflow = 'hidden';
    const imageIndex: number = imageList.findIndex((imageItem) => imageItem.id === image.id);
    setImageView(true);
    setImageIndex(imageIndex);
  };
  const getImageListComponent = (imageList: Array<ImageData>) => {
    return imageList.map((image: ImageData, index: number) => (
      <ImageComponent key={image.id} index={index} image={image} onClick={clickImage} />
    ));
  };
  const paramList = [{
    name: 'index',
    description: '浏览的图片位于当前图片列表第几张。',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'imageView',
    description: '是否显示图片浏览窗口',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'imageList',
    description: '图片列表',
    type: 'Array<ImageData>',
    defaultValue: '[]'
  }, {
    name: 'closeView',
    description: '关闭图片显示回调函数',
    type: '函数',
    defaultValue: ''
  }];
  const imageParamList = [{
    name: 'id',
    description: '图片id',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'sourceUrl',
    description: '图片原图地址',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'thumbnailUrl',
    description: '图片缩略图地址',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'thumbnailTrueUrl',
    description: '图片缩略图地址（懒加载使用）',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'name',
    description: '图片名称',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'width',
    description: '图片宽度',
    type: 'number',
    defaultValue: '无'
  }, {
    name: 'height',
    description: '图片高度',
    type: 'number',
    defaultValue: '无'
  }];
  const viewComponents = (
    <Row>
      {getImageListComponent(imageList)}
    </Row>
  );
  const code: string = '// 关闭显示\n' +
    'private closeView = () => {\n' +
    '  this.setState({ imageView: false });\n' +
    '};\n' +
    '<ImageViewComponent\n' +
    '  index={imageIndex}\n' +
    '  imageList={imageList}\n' +
    '  closeView={this.closeView}\n' +
    '  imageView={imageView}\n' +
    '/>';
  return (
    <Row>
      <TitleWithDescription title="ImageView" content="图片浏览。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={paramList} />
      <API title="ImageData" description="图片列表每张图片具体参数。" dataList={imageParamList} />
      <ImageViewComponent
        index={imageIndex}
        imageList={imageList}
        closeView={() => setImageView(false)}
        imageView={imageView}
      />
    </Row>
  );
};
export default ImageView;
