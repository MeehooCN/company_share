/**
 * @description: 图片对比
 * @author: cnn
 * @createTime: 2020/8/12 9:45
 **/
import React from 'react';
import { Row } from 'antd';
import { API, CodeExample, TitleWithDescription, ImageCompare, useImageCompareHook } from '@components/index';
// @ts-ignore
import origin from '@static/images/misaka-origin.jpg';
// @ts-ignore
import retouch from '@static/images/misaka-retouch.jpg';

const ImageCompareView = () => {
  const { comparisonView, openTimes, clickCompareImage, closeCompareView } = useImageCompareHook();
  const image = {
    name: 'misaka',
    originUrl: origin,
    retouchUrl: retouch,
    height: 0,
    width: 0,
    thumbnailUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg'
  };
  const code = 'import React from \'react\';\n' +
    'import { Row } from \'antd\';\n' +
    'import { ImageCompare, useImageCompareHook } from \'@components/index\';\n' +
    '// @ts-ignore\n' +
    'import origin from \'@static/images/misaka-origin.jpg\';\n' +
    '// @ts-ignore\n' +
    'import retouch from \'@static/images/misaka-retouch.jpg\';\n' +
    '\n' +
    'const ImageCompareView = () => {\n' +
    '  const { comparisonView, openTimes, clickCompareImage, closeCompareView } = useImageCompareHook();\n' +
    '  const image = {\n' +
    '    name: \'misaka\',\n' +
    '    originUrl: origin,\n' +
    '    retouchUrl: retouch,\n' +
    '    height: 0,\n' +
    '    width: 0,\n' +
    '    thumbnailUrl: \'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044907555,2122407846&fm=26&gp=0.jpg\'\n' +
    '  };\n' +
    '  return (\n' +
    '    <Row>\n' +
    '      <div style={{ height: image.height || 150, width: image.width || undefined, margin: 5, cursor: \'pointer\' }} onClick={clickCompareImage}>\n' +
    '        <img src={image.thumbnailUrl} alt={image.name} style={{ height: image.height || 150, width: \'auto\' }} />\n' +
    '      </div>\n' +
    '      <ImageCompare\n' +
    '        retouchUrl={image.retouchUrl}\n' +
    '        initUrl={image.originUrl}\n' +
    '        comparisonView={comparisonView}\n' +
    '        setComparisonView={closeCompareView}\n' +
    '        openTimes={openTimes}\n' +
    '      />\n' +
    '    </Row>\n' +
    '  );\n' +
    '};\n' +
    'export default ImageCompareView;';
  const paramList = [{
    name: 'retouchUrl',
    description: '修后图。',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'initUrl',
    description: '原图。',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'comparisonView',
    description: '是否显示对比图。',
    type: 'boolean',
    defaultValue: 'false'
  }, {
    name: 'setComparisonView',
    description: '设置是否显示对比图。',
    type: '函数',
    defaultValue: ''
  }, {
    name: 'openTimes',
    description: '开启次数',
    type: 'number',
    defaultValue: '0'
  }];
  const showImage = (
    <div style={{ height: image.height || 150, width: image.width || undefined, margin: 5, cursor: 'pointer' }} onClick={clickCompareImage}>
      <img src={image.thumbnailUrl} alt={image.name} style={{ height: image.height || 150, width: 'auto' }} />
    </div>
  );
  return (
    <Row>
      <TitleWithDescription title="ImageCompare" content="图片对比。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={showImage} code={code} />
      <API dataList={paramList} />
      <ImageCompare
        retouchUrl={image.retouchUrl}
        initUrl={image.originUrl}
        comparisonView={comparisonView}
        setComparisonView={closeCompareView}
        openTimes={openTimes}
      />
    </Row>
  );
};
export default ImageCompareView;
