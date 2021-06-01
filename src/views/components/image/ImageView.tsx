/**
 * @description: 图片浏览
 * @author: cnn
 * @createTime: 2020/8/3 10:29
 **/
import React, { useEffect } from 'react';
import { Row } from 'antd';
import {
  TitleWithDescription, API, CodeExample, ImageComponent, ImageView as ImageViewComponent,
  useImageViewHook
} from '@components/index';
import { ImageData } from '@utils/CommonInterface';

const ImageView = () => {
  const { imageList, setImageList, imageView, imageIndex, closeView, clickImage } = useImageViewHook();
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
  const code: string = 'import React, { useEffect } from \'react\';\n' +
    'import { Row } from \'antd\';\n' +
    'import { ImageComponent, ImageView as ImageViewComponent, useImageViewHook } from \'@components/index\';\n' +
    'import { ImageData } from \'@utils/CommonInterface\';\n' +
    '\n' +
    'const ImageView = () => {\n' +
    '  const { imageList, setImageList, imageView, imageIndex, closeView, clickImage } = useImageViewHook();\n' +
    '  useEffect(() => {\n' +
    '    const imageList: Array<ImageData> = [{\n' +
    '      id: \'1\',\n' +
    '      thumbnailUrl: \'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087715081,784938553&fm=26&gp=0.jpg\',\n' +
    '      thumbnailTrueUrl: \'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087715081,784938553&fm=26&gp=0.jpg\',\n' +
    '      sourceUrl: \'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147531787&di=bbc49d2e18f148d851f26e75e3e1375d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7c7bf85a6038c76fc5cc0ac8e6bdc176a9bea574a6f8c-GvTWgT_fw658\',\n' +
    '      name: \'misaka-1\',\n' +
    '      width: 0,\n' +
    '      height: 0\n' +
    '    }, {\n' +
    '      id: \'2\',\n' +
    '      thumbnailUrl: \'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4030263907,556408717&fm=26&gp=0.jpg\',\n' +
    '      thumbnailTrueUrl: \'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4030263907,556408717&fm=26&gp=0.jpg\',\n' +
    '      sourceUrl: \'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596433123754&di=44649d15c301cc97bfabbbd4d81d413c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dbea2e73f8e18367aad897fd51e728b68%2F90f955a7d933c895dfb0b26dd91373f083020032.jpg\',\n' +
    '      name: \'misaka-2\',\n' +
    '      width: 0,\n' +
    '      height: 0\n' +
    '    }, {\n' +
    '      id: \'3\',\n' +
    '      thumbnailUrl: \'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg\',\n' +
    '      thumbnailTrueUrl: \'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg\',\n' +
    '      sourceUrl: \'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597147588837&di=ffa801b9c9dc77d5d0b40e4db0b33331&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fce9f4aaaf1b253030e7b9ba2e6c14dc45320b5f2.jpg\',\n' +
    '      name: \'misaka-3\',\n' +
    '      width: 0,\n' +
    '      height: 0\n' +
    '    }];\n' +
    '    setImageList(imageList);\n' +
    '  }, []);\n' +
    '  // 获取图片列表\n' +
    '  const getImageListComponent = (imageList: Array<ImageData>) => {\n' +
    '    return imageList.map((image: ImageData, index: number) => (\n' +
    '      <ImageComponent key={image.id} index={index} image={image} onClick={clickImage} />\n' +
    '    ));\n' +
    '  };\n' +
    '  return (\n' +
    '    <Row>\n' +
    '      <Row>\n' +
    '        {getImageListComponent(imageList)}\n' +
    '      </Row>\n' +
    '      <ImageViewComponent\n' +
    '        index={imageIndex}\n' +
    '        imageList={imageList}\n' +
    '        closeView={closeView}\n' +
    '        imageView={imageView}\n' +
    '      />\n' +
    '    </Row>\n' +
    '  );\n' +
    '};\n' +
    'export default ImageView;';
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
        closeView={closeView}
        imageView={imageView}
      />
    </Row>
  );
};
export default ImageView;
