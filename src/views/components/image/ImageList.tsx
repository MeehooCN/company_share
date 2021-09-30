/**
 * @description: 图片列表
 * @author: cnn
 * @createTime: 2020/7/22 16:43
 **/
import React, { useEffect } from 'react';
import { Row } from 'antd';
import { API, CodeExample, ImageList, TitleWithDescription, useImageListHook } from '@components/index';
import { getClientWidth, throttle } from '@utils/CommonFunc';
import { ImageData } from '@components/components/image/ImageList/ImageComponent';

const ImageListView = () => {
  const { containerWidth, setContainerWidth, imagePropList, setImagePropList } = useImageListHook(getClientWidth() / 24 * 20 - 150);
  useEffect(() => {
    window.addEventListener('resize', throttle(onWindowResize));
    return () => {
      window.removeEventListener('resize', throttle(onWindowResize));
    };
  }, []);
  useEffect(() => {
    initImageList();
  }, []);
  // 初始化图片列表
  const initImageList = () => {
    const list: Array<ImageData> = [];
    for (let i = 0; i < 30; i++) {
      let width = Math.round(Math.random() * 800);
      let height = Math.round(Math.random() * 500);
      // 解决图片宽度为 1 时获取到的图片有问题的 bug
      if (width > 5 && height > 5) {
        list.push({
          id: i + '1',
          sourceUrl: 'https://source.unsplash.com/user/erondu/' + width + 'x' + height,
          thumbnailUrl: 'https://source.unsplash.com/user/erondu/' + width + 'x' + height, // 随机生成一个有宽度和高度的图片
          name: 'xx',
          width,
          height
        });
      }
    }
    setImagePropList(list);
  };
  // 监听窗口变化
  const onWindowResize = () => {
    setContainerWidth(getClientWidth() / 24 * 20 - 150);
  };
  const paramList = [{
    name: 'imageList',
    description: '图片列表',
    type: 'Array<ImageData>',
    defaultValue: '[]'
  }, {
    name: 'containerWidth',
    description: '可选，容器宽度',
    type: 'number',
    defaultValue: '1200'
  }, {
    name: 'onImageClick',
    description: '可选，点击单张图片触发的事件',
    type: '(image: ImageData, viewIndex: number): void',
    defaultValue: '无'
  }, {
    name: 'parentId',
    description: '可选，父容器 id',
    type: 'string',
    defaultValue: '无'
  }, {
    name: 'parentTop',
    description: '可选，父容器离顶部高度',
    type: 'number',
    defaultValue: '无'
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
  const viewComponents = <ImageList imagePropList={imagePropList} containerWidth={containerWidth} />;
  const code: string = 'import React, { useEffect } from \'react\';\n' +
    'import { Row } from \'antd\';\n' +
    'import Mock, { Random } from \'mockjs\';\n' +
    'import { ImageList, useImageListHook } from \'@components/index\';\n' +
    '\n' +
    'const ImageListView = () => {\n' +
    '  const { containerWidth, setContainerWidth, imagePropList, setImagePropList } = useImageListHook(1000);\n' +
    '  useEffect(() => {\n' +
    '    initImageList();\n' +
    '  }, []);\n' +
    '  // 初始化图片列表\n' +
    '  const initImageList = () => {\n' +
    '    return setImagePropList(Mock.mock({\n' +
    '      \'imageList|16-35\': [{\n' +
    '        \'id|+1\': 1,\n' +
    '        \'sourceUrl\': Random.dataImage(\'300x250\'),\n' +
    '        \'thumbnailUrl|+1\': [\n' +
    '          Random.dataImage(\'300x250\'),\n' +
    '          Random.dataImage(\'450x300\'),\n' +
    '          Random.dataImage(\'300x500\'),\n' +
    '          Random.dataImage(\'300x600\'),\n' +
    '          Random.dataImage(\'400x400\'),\n' +
    '          Random.dataImage(\'400x400\'),\n' +
    '        ],\n' +
    '        \'thumbnailTrueUrl|+1\': \'\',\n' +
    '        \'name\': Random.cname(),\n' +
    '        \'width|+1\': [300, 450, 300, 300, 400, 400],\n' +
    '        \'height|+1\': [250, 300, 500, 600, 400, 400]\n' +
    '      }]\n' +
    '    }).imageList);\n' +
    '  };\n' +
    '  return (\n' +
    '    <Row style={{ width: 1000 }}>\n' +
    '      <ImageList imagePropList={imagePropList} containerWidth={containerWidth} />\n' +
    '    </Row>\n' +
    '  );\n' +
    '};\n' +
    'export default ImageListView;';
  return (
    <Row>
      <TitleWithDescription title="ImageList" content="图片列表。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={paramList} />
      <API title="ImageData" description="图片列表每张图片具体参数。" dataList={imageParamList} />
    </Row>
  );
};
export default ImageListView;
