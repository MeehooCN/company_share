/**
 * @description: 文件上传限制
 * @author: cnn
 * @createTime: 2021/4/22 9:39
 **/
import React from 'react';
import { CodeBox, TitleWithDescription } from '@components/index';
import { Row, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { beforeUploadLimit } from '@utils/CommonFunc';
import { fileAccept } from '@utils/CommonVars';

const UploadLimit = () => {
  const code = '/**\n' +
    ' * 文件后缀\n' +
    ' **/\n' +
    'export const fileAccept = {\n' +
    '  doc: [\'.doc\', \'.docx\'],\n' +
    '  pdf: [\'.pdf\'],\n' +
    '  excel: [\'.xls\', \'.xlsx\'],\n' +
    '  zip: [\'.rar\', \'.zip\'],\n' +
    '  img: [\'.jpg\', \'.jpeg\', \'.png\', \'.bmp\'],\n' +
    '  all: [\'.doc\', \'.docx\', \'.pdf\', \'.xls\', \'.xlsx\', \'.rar\', \'.zip\', \'.jpg\', \'.jpeg\', \'.png\', \'.bmp\']\n' +
    '};\n' +
    '/**\n' +
    ' * limitSize: 文件限制大小（MB）\n' +
    ' * limitType： 限制文件的 格式\n' +
    ' * limitFileNameLength: 限制文件名长度\n' +
    ' * limitFileName: 文件名中不应包含字符\n' +
    ' * file: 文件\n' +
    ' **/\n' +
    'export const beforeUploadLimit = (limitSize: number, limitType: Array<string>, limitFileNameLength: number, limitFileName: Array<string>, file: any) => {\n' +
    '  const isLtLimitSize = file.size / 1024 / 1024 < limitSize;\n' +
    '  // 限制文件大小\n' +
    '  if (!isLtLimitSize) {\n' +
    '    message.error(\'文件不能超过 \' + limitSize + \' MB\');\n' +
    '    return Upload.LIST_IGNORE;\n' +
    '  }\n' +
    '  // 限制文件格式\n' +
    '  let fileSuf = file.name.split(\'.\');\n' +
    '  let suffix = fileSuf[fileSuf.length - 1].toLowerCase();\n' +
    '  if (limitType.indexOf(\'.\' + suffix) === -1) {\n' +
    '    message.error(\'文件限\' + limitType.join(\'、\') + \'格式\');\n' +
    '    return Upload.LIST_IGNORE;\n' +
    '  }\n' +
    '  // 限制文件名长度\n' +
    '  if (file.name.length > limitFileNameLength) {\n' +
    '    message.error(\'文件名长度不能超过 \' + limitFileNameLength + \' 字\');\n' +
    '    return Upload.LIST_IGNORE;\n' +
    '  }\n' +
    '  // 限制文件名中不应包含字符\n' +
    '  for (let i = 0; i < limitFileName.length; i++) {\n' +
    '    const item = limitFileName[i];\n' +
    '    if (file.name.indexOf(item) !== -1) {\n' +
    '      message.error(\'文件名中不应包含字符 \' + limitFileName.join(\' \') + \' 字符\');\n' +
    '      return Upload.LIST_IGNORE;\n' +
    '    }\n' +
    '  }\n' +
    '  return true;\n' +
    '};';
  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: (info: any) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file: any) => {
      return beforeUploadLimit(20, [...fileAccept.doc, ...fileAccept.zip], 20, ['#', '&'], file);
    }
  };
  return (
    <div>
      <TitleWithDescription
        title="文件上传限制"
        content="限制文件大小，文件名长度，文件类型"
      />
      <div style={{ marginTop: 20 }}>
        <Row style={{ marginBottom: 10 }}>
          上传文件特别是上传到 oss 需要限制文件名不能包含 '#' '&'。
        </Row>
        <Row style={{ marginBottom: 10 }}>
          文件 url 需要编码，特别是 '+' 需转为 '%2B'。
        </Row>
        <Row style={{ marginBottom: 20 }}>
          公司的附件上传因为后台转了文件名所以没出现这些问题，但上传到 oss 就会有这些问题，可以注意一下。
        </Row>
        <Row style={{ marginBottom: 10 }}>
          下面是个例子：
        </Row>
        <Row style={{ marginBottom: 10 }}>
          仅能上传大小限制 20MB，文件类型为 .doc，.docx, .zip, .rar，文件名长度小于 20 的文件，且文件名不应包含 ‘#’ ‘&’ 字符。
        </Row>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>上传文件</Button>
        </Upload>
      </div>
      <Row style={{ marginTop: 20 }}>
        <CodeBox code={code} />
      </Row>
    </div>
  );
};
export default UploadLimit;
