/**
 * @description: useEffect 使用总结
 * @author: cnn
 * @createTime: 2020/8/6 11:23
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, CodeBox } from '@components/index';
import './../index.less';

const UseEffect = () => {
  const code1: string = 'const [imageList, setImageList] = useState<Array<ImageDataWithViewContainer>>([]);\n' +
    'useEffect(() => {\n' +
    '    // 原本回调函数的内容。\n' +
    '}, [imageList]);';
  const code2: string = 'const { imagePropList, containerWidth = 1200 } = props;\n' +
    'const [imageList, setImageList] = useState<Array<ImageDataWithViewContainer>>([]);\n' +
    'const [isInit, setIsInit] = useState<boolean>(false);\n' +
    '\n' +
    'useEffect(() => {\n' +
    '  setIsInit(true);\n' +
    '  setImageList(tempImageList);\n' +
    '}, [imagePropList]);\n' +
    'useEffect(() => {\n' +
    '  if (isInit) {\n' +
    '    setImageList(tempImageList);\n' +
    '    setIsInit(false);\n' +
    '  }\n' +
    '}, [imageList]);';
  return (
    <div>
      <TitleWithDescription
        title="UseEffect"
        content="useEffect 使用总结。"
        url="https://react.docschina.org/docs/fragments.html"
      />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">当你想用原来的 setState 回调时你应该怎么做：</Row>
        <CodeBox code={code1} />
        <Row className="description">可是这样写，我其实并不是每次改变 imageList 都想进行该回调，我只想在 imagePropList 变化后执行，于是可以这么写：</Row>
        <CodeBox code={code2} />
      </Row>
    </div>
  );
};
export default UseEffect;
