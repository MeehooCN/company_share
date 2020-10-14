/**
 * @description: Ant-design 结合 Iconfont 图标库的使用。
 * @author: cnn
 * @createTime: 2020/10/14 14:45
 **/
import React from 'react';
import { Row } from 'antd';
import {CodeBox, TitleWithDescription} from '@components/index';
import './../index.less';

const IconFont = () => {
  const code1: string = '// jsonTo.js\n' +
    'var fs = require(\'fs\');\n' +
    'var iconfont = require(\'./iconfont.json\');\n' +
    'var iconList = [];\n' +
    '// 前缀\n' +
    'if (iconfont.css_prefix_text) {\n' +
    '  prefix = iconfont.css_prefix_text;\n' +
    '}\n' +
    'if (iconfont.glyphs) {\n' +
    '  for (let i = 0; i < iconfont.glyphs.length; i++) {\n' +
    '    iconList.push(prefix + iconfont.glyphs[i].font_class);\n' +
    '  }\n' +
    '}\n' +
    '// 写入\n' +
    'fs.writeFile(\'./iconList.json\', JSON.stringify(iconList), function(err) {\n' +
    '  if (err) {\n' +
    '    console.error(err);\n' +
    '  } else {\n' +
    '    console.log(\'----------修改成功-------------\');\n' +
    '  }\n' +
    '}); ';
  const code2: string = 'node jsonTo.js';
  const code3: string = 'import React from \'react\';\n' +
    'import { Row } from \'antd\';\n' +
    'import { createFromIconfontCN } from \'@ant-design/icons\';\n' +
    'import \'./iconFontChoose.less\';\n' +
    '\n' +
    '// json 文件获取方式见步骤 2\n' +
    'const iconList: Array<string> = require(\'./iconList.json\');\n' +
    'const IconFont = createFromIconfontCN({\n' +
    '  scriptUrl: \'//at.alicdn.com/t/font_2128119_azpz6axvjos.js\',\n' +
    '});\n' +
    '\n' +
    'interface IProps {\n' +
    '  onClick(icon: string): void\n' +
    '}\n' +
    '\n' +
    'const IconFontChoose = (props: IProps) => {\n' +
    '  const { onClick } = props;\n' +
    '  return (\n' +
    '    <Row style={{ width: 500 }}>\n' +
    '      {iconList.map((item: string) => (\n' +
    '        <IconFont className="icon-font" key={item} type={item} onClick={() => onClick(item)} />\n' +
    '      ))}\n' +
    '    </Row>\n' +
    '  );\n' +
    '};\n' +
    'export default IconFontChoose;';
  return (
    <div>
      <TitleWithDescription title="Ant-design 结合 Iconfont 图标库的使用" content="" url="http://note.youdao.com/s/1Lh9fBgG" />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">
          1. 收藏图标至项目中，获取 Symbol js 文件。
        </Row>
        <Row className="description">
          2. 获取所需 json 文件（所有的图标名称数组）
        </Row>
        <Row className="description">
          （1）点击下载到本地<br />
          （2）解压后，找到 iconfont.json 文件。<br />
          （3）写个脚本读取文件 iconfont.json，写入 iconList.json。<br />
        </Row>
        <CodeBox code={code1} />
        <Row className="description">
          （4）运行脚本，成功后会生成步骤3中所需的 json 文件。
        </Row>
        <CodeBox code={code2} />
        <Row className="description">
          3. 使用 ant-design 支持的 Iconfont 导入方式引入图标。
        </Row>
        <CodeBox code={code3} />
      </Row>
    </div>
  );
};
export default IconFont;
