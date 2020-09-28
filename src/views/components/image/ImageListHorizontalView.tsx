/**
 * @description: 横向图片列表
 * @author: cnn
 * @createTime: 2020/9/28 14:23
 **/
import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { API, CodeExample, ImageListHorizontal, TitleWithDescription } from '@components/index';
import { ImageData } from '@components/components/image/ImageListHorizontal';

const horizontalImageHeight: number = 120;

const ImageListHorizontalView = () => {
  const [imageList, setImageList] = useState<Array<ImageData>>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  useEffect(() => {
    const imageList: Array<ImageData> = [{
      id: '1',
      thumbnailUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087715081,784938553&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087715081,784938553&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147531787&di=bbc49d2e18f148d851f26e75e3e1375d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7c7bf85a6038c76fc5cc0ac8e6bdc176a9bea574a6f8c-GvTWgT_fw658',
      name: 'misaka-1',
      width: 570,
      height: 797,
      leftPosition: 0
    }, {
      id: '2',
      thumbnailUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4030263907,556408717&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4030263907,556408717&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596433123754&di=44649d15c301cc97bfabbbd4d81d413c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dbea2e73f8e18367aad897fd51e728b68%2F90f955a7d933c895dfb0b26dd91373f083020032.jpg',
      name: 'misaka-2',
      width: 580,
      height: 326,
      leftPosition: 0
    }, {
      id: '3',
      thumbnailUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147588837&di=ffa801b9c9dc77d5d0b40e4db0b33331&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fce9f4aaaf1b253030e7b9ba2e6c14dc45320b5f2.jpg',
      name: 'misaka-3',
      width: 2300,
      height: 1326,
      leftPosition: 0
    }, {
      id: '4',
      thumbnailUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147588837&di=ffa801b9c9dc77d5d0b40e4db0b33331&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fce9f4aaaf1b253030e7b9ba2e6c14dc45320b5f2.jpg',
      name: 'misaka-3',
      width: 2300,
      height: 1326,
      leftPosition: 0
    }, {
      id: '5',
      thumbnailUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4030263907,556408717&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4030263907,556408717&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596433123754&di=44649d15c301cc97bfabbbd4d81d413c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dbea2e73f8e18367aad897fd51e728b68%2F90f955a7d933c895dfb0b26dd91373f083020032.jpg',
      name: 'misaka-2',
      width: 580,
      height: 326,
      leftPosition: 0
    }, {
      id: '6',
      thumbnailUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087715081,784938553&fm=26&gp=0.jpg',
      thumbnailTrueUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087715081,784938553&fm=26&gp=0.jpg',
      sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147531787&di=bbc49d2e18f148d851f26e75e3e1375d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7c7bf85a6038c76fc5cc0ac8e6bdc176a9bea574a6f8c-GvTWgT_fw658',
      name: 'misaka-1',
      width: 570,
      height: 797,
      leftPosition: 0
    }];
    setImageList(imageList);
  }, []);
  const onImageClick = (image: ImageData, index: number) => {
    setCurrentImageIndex(index);
  };
  const viewComponents = (
    <ImageListHorizontal
      propImageList={imageList}
      onImageClick={onImageClick}
      bottomImageListWidth={800}
      viewIndex={currentImageIndex}
      horizontalImageHeight={horizontalImageHeight}
    />
  );
  const code: string = '<ImageListHorizontal\n' +
    '  propImageList={imageList}\n' +
    '  onImageClick={onImageClick}\n' +
    '  bottomImageListWidth={800}\n' +
    '  viewIndex={currentImageIndex}\n' +
    '  horizontalImageHeight={horizontalImageHeight}\n' +
    '/>';
  const paramList = [{
    name: 'propImageList',
    description: '图片列表',
    type: 'Array<ImageData>',
    defaultValue: '[]'
  }, {
    name: 'onImageClick',
    description: '点击图片回调',
    type: 'Function',
    defaultValue: '无'
  }, {
    name: 'bottomImageListWidth',
    description: '图片列表宽度',
    type: 'number',
    defaultValue: '无'
  }, {
    name: 'viewIndex',
    description: '当前选中图片位置',
    type: 'number',
    defaultValue: '无'
  }, {
    name: 'horizontalImageHeight',
    description: '图片列表高度',
    type: 'number',
    defaultValue: '无'
  }];
  return (
    <Row>
      <TitleWithDescription title="ImageListHorizontal" content="水平图片列表（带懒加载）。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={paramList} />
    </Row>
  );
};
export default ImageListHorizontalView;
