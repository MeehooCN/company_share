/**
 * @description: 传送门（适用遮罩层）
 * @author: cnn
 * @createTime: 2020/7/21 15:35
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, CodeBox } from '@components/index';

const CreatePortal = () => {
  const code: string = 'import React from \'react\';\n' +
    'import { createPortal } from \'react-dom\';\n' +
    '\n' +
    'interface IProps {}\n' +
    '\n' +
    'interface IState {}\n' +
    '\n' +
    'class AlbumImage extends React.Component<IProps, IState> {\n' +
    '  constructor(props: any) {\n' +
    '    super(props);\n' +
    '    // 初始化遮罩层\n' +
    '    const document = window.document;\n' +
    '    this.node = document.createElement(\'div\');\n' +
    '    document.body.appendChild(this.node);\n' +
    '  }\n' +
    '  componentWillUnmount() {\n' +
    '    // 避免多次渲染同一个遮罩层\n' +
    '    window.document.body.removeChild(this.node);\n' +
    '  }\n' +
    '  private readonly node: any;\n' +
    '  render(): React.ReactNode {\n' +
    '    return createPortal((\n' +
    '      <div style={{ position: \'fixed\', top: 0, left: 0 }}>\n' +
    '        遮罩层\n' +
    '      </div>\n' +
    '    ), this.node);\n' +
    '  }\n' +
    '}\n' +
    'export default AlbumImage;';
  return (
    <div>
      <TitleWithDescription title="CreatePortal" content="传送门，适用于遮罩层，对 z-index 有要求的。" />
      <Row style={{ marginTop: 20 }}>
        <CodeBox code={code} />
      </Row>
    </div>
  );
};
export default CreatePortal;
