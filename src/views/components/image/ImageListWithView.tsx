/**
 * @description: 图片列表，点击看大图
 * @author: cnn
 * @createTime: 2021/6/1 15:30
 **/
import React, { useEffect } from 'react';
import {
  API, CodeExample, ImageListWithView as ImageListWithViewComponent,
  TitleWithDescription, useImageListWithViewHook
} from '@components/index';
import { ImageData } from '@components/components/image/ImageListHorizontal/ImageListHorizontal';
import { getClientWidth, throttle } from '@utils/CommonFunc';
import { Row } from 'antd';

const ImageListWithView = () => {
  const {
    imageList, setImageList, currentIndex, onImageClick, containerWidth,
    setContainerWidth, imageView, closeView, onHorImageClick
  } = useImageListWithViewHook(1000);
  useEffect(() => {
    setContainerWidth(getClientWidth() / 24 * 20 - 150);
    getImageList();
    window.addEventListener('resize', throttle(onWindowResize));
    return () => {
      window.removeEventListener('resize', throttle(onWindowResize));
    };
  }, []);
  // 监听窗口变化
  const onWindowResize = () => {
    setContainerWidth(getClientWidth() / 24 * 20 - 150);
  };
  // 获取图片列表
  const getImageList = () => {
    const tempImageList: Array<ImageData> = [{
      id: '1',
      thumbnailUrl: 'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnailTrueUrl: 'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sourceUrl: 'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'p1',
      width: 1688,
      height: 2250,
      leftPosition: 0
    }, {
      id: '2',
      thumbnailUrl: 'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnailTrueUrl: 'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sourceUrl: 'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'p2',
      width: 1125,
      height: 1500,
      leftPosition: 0
    }, {
      id: '3',
      thumbnailUrl: 'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnailTrueUrl: 'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sourceUrl: 'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'p3',
      width: 4608,
      height: 3072,
      leftPosition: 0
    }, {
      id: '4',
      thumbnailUrl: 'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbnailTrueUrl: 'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sourceUrl: 'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'p4',
      width: 1000,
      height: 1500,
      leftPosition: 0
    }];
    const imageList: Array<ImageData> = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < tempImageList.length; j++) {
        imageList.push({
          ...tempImageList[j],
          id: tempImageList[j].id + '-' + i
        });
      }
    }
    setImageList(imageList);
  };
  const paramList = [{
    name: 'imageList',
    description: '图片列表',
    type: 'Array<ImageData>',
    defaultValue: '[]'
  }, {
    name: 'containerWidth',
    description: '图片列表容器宽度。',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'horizontalImageHeight',
    description: '水平图片高度',
    type: 'number',
    defaultValue: '150'
  }, {
    name: 'currentIndex',
    description: '当前选中图片下标',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'imageView',
    description: '是否显示大图',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'onImageClick',
    description: '垂直列表图片选中回调',
    type: 'Function',
    defaultValue: ''
  }, {
    name: 'onHorImageClick',
    description: '水平列表选中回调',
    type: 'Function',
    defaultValue: ''
  }, {
    name: 'closeView',
    description: '关闭图片显示回调函数',
    type: 'Function',
    defaultValue: ''
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
  const code: string = 'import React, { useEffect } from \'react\';\n' +
    'import { ImageListWithView as ImageListWithViewComponent, useImageListWithViewHook } from \'@components/index\';\n' +
    'import { ImageData } from \'@components/components/image/ImageListHorizontal/ImageListHorizontal\';\n' +
    'import { getClientWidth, throttle } from \'@utils/CommonFunc\';\n' +
    '\n' +
    'const ImageListWithView = () => {\n' +
    '  const {\n' +
    '    imageList, setImageList, currentIndex, onImageClick, containerWidth,\n' +
    '    setContainerWidth, imageView, closeView, onHorImageClick\n' +
    '  } = useImageListWithViewHook(1000);\n' +
    '  useEffect(() => {\n' +
    '    setContainerWidth(getClientWidth() / 24 * 20 - 150);\n' +
    '    getImageList();\n' +
    '    window.addEventListener(\'resize\', throttle(onWindowResize));\n' +
    '    return () => {\n' +
    '      window.removeEventListener(\'resize\', throttle(onWindowResize));\n' +
    '    };\n' +
    '  }, []);\n' +
    '  // 监听窗口变化\n' +
    '  const onWindowResize = () => {\n' +
    '    setContainerWidth(getClientWidth() / 24 * 20 - 150);\n' +
    '  };\n' +
    '  // 获取图片列表\n' +
    '  const getImageList = () => {\n' +
    '    const tempImageList: Array<ImageData> = [{\n' +
    '      id: \'1\',\n' +
    '      thumbnailUrl: \'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\',\n' +
    '      thumbnailTrueUrl: \'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\',\n' +
    '      sourceUrl: \'https://images.pexels.com/photos/7258244/pexels-photo-7258244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\',\n' +
    '      name: \'p1\',\n' +
    '      width: 1688,\n' +
    '      height: 2250,\n' +
    '      leftPosition: 0\n' +
    '    }, {\n' +
    '      id: \'2\',\n' +
    '      thumbnailUrl: \'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\',\n' +
    '      thumbnailTrueUrl: \'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\',\n' +
    '      sourceUrl: \'https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\',\n' +
    '      name: \'p2\',\n' +
    '      width: 1125,\n' +
    '      height: 1500,\n' +
    '      leftPosition: 0\n' +
    '    }, {\n' +
    '      id: \'3\',\n' +
    '      thumbnailUrl: \'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\',\n' +
    '      thumbnailTrueUrl: \'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\',\n' +
    '      sourceUrl: \'https://images.pexels.com/photos/4284233/pexels-photo-4284233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\',\n' +
    '      name: \'p3\',\n' +
    '      width: 4608,\n' +
    '      height: 3072,\n' +
    '      leftPosition: 0\n' +
    '    }, {\n' +
    '      id: \'4\',\n' +
    '      thumbnailUrl: \'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\',\n' +
    '      thumbnailTrueUrl: \'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\',\n' +
    '      sourceUrl: \'https://images.pexels.com/photos/7790741/pexels-photo-7790741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\',\n' +
    '      name: \'p4\',\n' +
    '      width: 1000,\n' +
    '      height: 1500,\n' +
    '      leftPosition: 0\n' +
    '    }];\n' +
    '    const imageList: Array<ImageData> = [];\n' +
    '    for (let i = 0; i < 5; i++) {\n' +
    '      for (let j = 0; j < tempImageList.length; j++) {\n' +
    '        imageList.push({\n' +
    '          ...tempImageList[j],\n' +
    '          id: tempImageList[j].id + \'-\' + i\n' +
    '        });\n' +
    '      }\n' +
    '    }\n' +
    '    setImageList(imageList);\n' +
    '  };\n' +
    '  return (\n' +
    '    <div>\n' +
    '      <ImageListWithViewComponent\n' +
    '        imageList={imageList}\n' +
    '        containerWidth={containerWidth}\n' +
    '        horizontalImageHeight={150}\n' +
    '        currentIndex={currentIndex}\n' +
    '        onImageClick={onImageClick}\n' +
    '        imageView={imageView}\n' +
    '        closeView={closeView}\n' +
    '        onHorImageClick={onHorImageClick}\n' +
    '      />\n' +
    '    </div>\n' +
    '  );\n' +
    '};\n' +
    'export default ImageListWithView;\n';
  return (
    <Row>
      <TitleWithDescription title="ImageListWithView" content="图片列表带浏览。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample
        viewComponents={(
          <ImageListWithViewComponent
            imageList={imageList}
            containerWidth={containerWidth}
            currentIndex={currentIndex}
            imageView={imageView}
            onImageClick={onImageClick}
            onHorImageClick={onHorImageClick}
            closeView={closeView}
          />
        )}
        code={code}
      />
      <API dataList={paramList} />
    </Row>
  );
};
export default ImageListWithView;
